using appUcleus2.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace appUcleus2.Areas.Negocios.Controllers
{
    public class ProductosController : Controller
    {
        // GET: Negocios/Productos
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>  
        ///   
        ///ProductosNegocio
        /// </summary>  
        /// <returns></returns>  
        public JsonResult ProductosNegocio()
        {
            appUEntities1 db = new appUEntities1();
            bool proxy = db.Configuration.ProxyCreationEnabled;
            try
            {
                //cookie negocioid
                int idNegocio = Convert.ToInt32(Session["negocioId"]);

                db.Configuration.ProxyCreationEnabled = false;
                List<productos> productos = db.productos.Where(x => x.fkNegocio == idNegocio).ToList();

                return Json(productos, JsonRequestBehavior.AllowGet);
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

 


        public string Insert_producto(productos product)
        {
            var file = Request.Files[0];
            string fileName;
            if (product != null)
            {
                //cookie negocioid
                int idNegocio = Convert.ToInt32(Session["negocioId"]);
                fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                file.SaveAs(Path.Combine(Server.MapPath("~/imagenesProductos"), fileName));
                using (appUEntities1 Obj = new appUEntities1())
                {
                    product.imgProducto = fileName;
                    product.fkNegocio = idNegocio;
                    product.fechaRegistro = DateTime.Now;
                    product.fkCategoria = product.fkCategoria;
                    product.activo = true;
                    Obj.productos.Add(product);
                    Obj.SaveChanges();
                    return "producto Added Successfully";
                }
            }
            else
            {
                return "producto Not Inserted! Try Again";
            }
        }

        public JsonResult productoActual(int idP)
        {
            appUEntities1 db = new appUEntities1();
            bool proxy = db.Configuration.ProxyCreationEnabled;
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                productos produc = db.productos.Where(x => x.idProducto == idP).First();

                return Json(produc, JsonRequestBehavior.AllowGet);
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
        /// Update negocioe Information  
        /// </summary>  
        /// <param name="Pro"></param>  
        /// <returns></returns>  
        public string Update_producto(productos pro)
        {
            var file = Request.Files[0];
            string fileName;
            if (pro != null)
            {
                fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                file.SaveAs(Path.Combine(Server.MapPath("~/imagenesProductos"), fileName));
                using (appUEntities1 Obj = new appUEntities1())
                {
                    var Neg_ = Obj.Entry(pro);
                    productos proObj = Obj.productos.Where(x => x.idProducto == pro.idProducto).FirstOrDefault();
                    proObj.imgProducto = fileName;
                    proObj.producto = pro.producto;
                    proObj.descripcion = pro.descripcion;
                    proObj.precio = pro.precio;
                    Obj.SaveChanges();
                    return "producto Updated Successfully";
                }
            }
            else
            {
                return "producto Not Updated! Try Again";
            }
        }

        /// <summary>  
        /// Update negocioe Information  
        /// </summary>  
        /// <param name="Pro"></param>  
        /// <returns></returns>  
        public string cambiarEstatusProducto(productos pro)
        {
            if (pro != null)
            {
                using (appUEntities1 Obj = new appUEntities1())
                {
                    var Neg_ = Obj.Entry(pro);
                    productos proObj = Obj.productos.Where(x => x.idProducto == pro.idProducto).FirstOrDefault();
                    proObj.activo = pro.activo;
                    Obj.SaveChanges();
                    return "negocioe Updated Successfully";
                }
            }
            else
            {
                return "negocioe Not Updated! Try Again";
            }
        }

    }
}