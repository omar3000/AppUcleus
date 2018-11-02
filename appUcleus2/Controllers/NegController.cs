using Accord;
using Accord.MachineLearning.DecisionTrees;
using Accord.MachineLearning.DecisionTrees.Learning;
using Accord.Math;
using Accord.Math.Optimization.Losses;
using Accord.Statistics.Filters;
using appUcleus2.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace appUcleus2.Controllers
{
    public class NegController : Controller
    {
        appUEntities1 db = new appUEntities1();

        // GET: Negocios
        public ActionResult recomendaciones()
        {
            return View();
        }

        

        public ActionResult ModalAgregarProducto()
        {
            return PartialView();
        }

       
        public  JsonResult algoritmoRecomendaciones()
        {
            bool proxy = db.Configuration.ProxyCreationEnabled;

            try
            {
                db.Configuration.ProxyCreationEnabled = false;

                int idlogin = Convert.ToInt32(Request.Cookies["LoginID"].Value);
                //cookie idventa carrito
                int idCategoria = Convert.ToInt32(Session["categoria"]);
                List<negocios> neg = new List<negocios>();
                ventas v = db.ventas.Where(x => x.fkUsuarioPedido == idlogin && x.estatus > 0).FirstOrDefault();
                if (v == null)
                {
                    neg = db.negocios.ToList();
                }
                else
                {
                    //int[][] prodcucotsOrdenar = new int[][];
                    //int i= 0;
                    List<productos> recomendaciones = ArbolDesicion();
                    neg = traerNegociosPorCategoria(recomendaciones);
   

                }
                return Json(neg, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message);
            }
            finally
            {
                db.Configuration.ProxyCreationEnabled = proxy;

            }
        }


        private List<negocios> traerNegociosPorCategoria(List<productos> recomendaciones)
        {
            Dictionary<int, int> productosOrdenar = new Dictionary<int, int>();
            List<negocios> neg = new List<negocios>();


            foreach (negocios n in db.negocios.ToList())
            {
                if (recomendaciones.Where(x => x.fkNegocio == n.idNegocio).Count() > 0)
                {

                    productosOrdenar.Add(n.idNegocio, recomendaciones.Where(x => x.fkNegocio == n.idNegocio).Count());
                }
            }

            foreach (var p in productosOrdenar.OrderByDescending(x => x.Value))
            {
                neg.Add(db.negocios.Find(p.Key));
            }

            return neg;

        }


        /// <summary>  
        ///   
        /// Get All negocioe  
        /// </summary>  
        /// <returns></returns>  
        public JsonResult GetAllnegocios()
        {
           
            bool proxy = db.Configuration.ProxyCreationEnabled;
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                int idCategoria = Convert.ToInt32(Session["categoria"]);
                List<negocios> neg = new List<negocios>();
                if (idCategoria == 0)
                {
                    neg = db.negocios.ToList();
                }
                else
                {
                    neg = traerNegociosPorCategoriaProductos();
                }
                return Json(neg, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message);
            }
            finally
            {
                db.Configuration.ProxyCreationEnabled = proxy;

            }

        }

        private List<productos> ArbolDesicion()
        {
            return revisarProductos(entrenarArbol());
        }

        private DataTable entrenarArbol()
        {
            var myCookielog = Request.Cookies["LoginID"].Value;
            int idlogin = Convert.ToInt32(myCookielog);
            List<productos> produdctosNoComprados = db.productos.ToList();

            DataTable data = new DataTable("recomiendas producto");
            data.Columns.Add("id", "Categoria", "Precio", "recomendar");

            //cookie idventa carrito
            List<ventas> Lv = db.ventas.Where(x => x.fkUsuarioPedido == idlogin && x.estatus > 0).ToList();
            foreach (ventas v in Lv)
            {
                List<detalleVenta> dv = db.detalleVenta.Where(x => x.fkVenta == v.idventa).ToList();

                List<productos> ListProductos = db.productos.Where(x => x.fkNegocio == v.fkNegocio && x.activo).ToList();

                foreach (detalleVenta detalle in dv)
                {
                    productos producto = ListProductos.Where(x => x.idProducto == detalle.fkProducto).FirstOrDefault();
                    if (producto != null)
                    {
                        produdctosNoComprados.Remove(producto);

                        data.Rows.Add(Convert.ToString(producto.idProducto), Convert.ToString(producto.fkCategoria), devolverTipoPrecio(producto.precio), "si");
                        //productosCompradosPorCliente.Add(producto);
                    }

                }
            }

            foreach (var item in produdctosNoComprados)
            {
                data.Rows.Add(Convert.ToString(item.idProducto), Convert.ToString(item.fkCategoria), devolverTipoPrecio(item.precio), "no");
            }

            return data;
        }

        private List<productos> revisarProductos(DataTable data)
        {
            var codebook = new Codification(data);

            int numCategorias = db.categorias.Count();
            DecisionVariable[] attributes =
            {
                new DecisionVariable("Categoria", numCategorias), // 3 possible values (Sunny, overcast, rain)
                new DecisionVariable("Precio", 5), // 3 possible values (Hot, mild, cool)  
            };

            int classCount = 2; // 2 possible output values for playing tennis: yes or no

            DecisionTree tree = new DecisionTree(attributes, classCount);

            // Create a new instance of the ID3 algorithm
            ID3Learning id3learning = new ID3Learning(tree);

            // Translate our training data into integer symbols using our codebook:
            DataTable symbols = codebook.Apply(data);
            int[][] inputs = symbols.ToIntArray("Categoria", "Precio");
            int[] outputs = symbols.ToIntArray("recomendar").GetColumn(0);

            // Learn the training instances!
            id3learning.Run(inputs, outputs);

            // Compute the training error when predicting training instances
            double error = new ZeroOneLoss(outputs).Loss(tree.Decide(inputs));

            // The tree can now be queried for new examples through 
            // its decide method. For example, we can create a query

            List<productos> product = db.productos.ToList();
            foreach (productos item in db.productos.ToList())
            {
                int[] query = codebook.Transform(new[,] {
                     { "Categoria", Convert.ToString(item.fkCategoria)},
                     { "Precio", devolverTipoPrecio(item.precio)}
                });

                // And then predict the label using
                int predicted = tree.Decide(query);  // result will be 0

                // We can translate it back to strings using
                string answer = codebook.Revert("recomendar", predicted); // Answer will be: "No"
                if (answer.Equals("no"))
                {
                    product.Remove(item);
                }

            }
            return product;
        } 
        
        private string devolverTipoPrecio(decimal precio)
        {
            if (precio > 200)
            {
                return "demasiado caro";
            }
            else if (precio > 150)
            {
                return "muy caro";
            }
            else if (precio > 100)
            {
                return "caro";
            }
            else if (precio > 50)
            {
                return "normal";
            }
            else
            {
                return "barato";
            }
        }
        

        private List<negocios> traerNegociosPorCategoriaProductos()
        {
            int idCategoria = Convert.ToInt32(Session["categoria"]);

            bool proxy = db.Configuration.ProxyCreationEnabled;
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                List<productos> Lproductos = db.productos.Where(x => x.fkCategoria == idCategoria).ToList();      
                return traerNegociosPorCategoria(Lproductos);
            }
            catch (Exception e)
            {
                return null;
            }
            finally
            {
                db.Configuration.ProxyCreationEnabled = proxy;

            }

        }

        public JsonResult traerNegocio()
        {
            bool proxy = db.Configuration.ProxyCreationEnabled;
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                var myCookieven = Request.Cookies["IdVenta"].Value;
                int idVenta = Convert.ToInt32(myCookieven);

                int idNegocio = db.ventas.Where(x => x.idventa == idVenta).FirstOrDefault().fkNegocio;
                negocios negocio= db.negocios.Where(x => x.idNegocio == idNegocio).FirstOrDefault();

                return Json(negocio, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message);
            }
            finally
            {
                db.Configuration.ProxyCreationEnabled = proxy;

            }

        }


        public JsonResult traerNegocioById(string idNegocio)
        {

            bool proxy = db.Configuration.ProxyCreationEnabled;
            try
            {
                db.Configuration.ProxyCreationEnabled = false;

                int idN = Convert.ToInt32(idNegocio);
                negocios negocio = db.negocios.Where(x => x.idNegocio == idN).FirstOrDefault();

                return Json(negocio, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message);
            }
            finally
            {
                db.Configuration.ProxyCreationEnabled = proxy;

            }

        }





        /// <summary>  
        /// Get negocioe With Id  
        /// </summary>  
        /// <param name="Id"></param>  
        /// <returns></returns>  
        public JsonResult Get_negocioById(string Id)
        {
            int EmpId = int.Parse(Id);
            return Json(db.negocios.Find(EmpId), JsonRequestBehavior.AllowGet);
            
        }
      
        /// <summary>  
        /// Delete negocioe Information  
        /// </summary>  
        /// <param name="Neg"></param>  
        /// <returns></returns>  
        public string Delete_negocio(negocios Neg)
        {
            if (Neg != null)
            {
                var Neg_ = db.Entry(Neg);
                if (Neg_.State == System.Data.Entity.EntityState.Detached)
                {
                    db.negocios.Attach(Neg);
                    db.negocios.Remove(Neg);
                }
                db.SaveChanges();
                return "negocioe Deleted Successfully";
            }
            else
            {
                return "negocioe Not Deleted! Try Again";
            }
        }
        /// <summary>  
        /// Update negocioe Information  
        /// </summary>  
        /// <param name="Emp"></param>  
        /// <returns></returns>  
        public string Update_negocio(negocios Neg)
        {
            if (Neg != null)
            {
                var Neg_ = db.Entry(Neg);
                negocios negObj = db.negocios.Where(x => x.idNegocio == Neg.idNegocio).FirstOrDefault();
                negObj.nombre = Neg.nombre;
                negObj.calle = Neg.calle;
                negObj.numero = Neg.numero;
                negObj.colonia = Neg.colonia;
                negObj.ciudad = Neg.ciudad;
                db.SaveChanges();
                return "negocioe Updated Successfully";

            }
            else
            {
                return "negocioe Not Updated! Try Again";
            }
        }

    }
}