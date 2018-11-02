using appUcleus2.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web.Mvc;

namespace appUcleus2.Areas.Negocios.Controllers
{
    
    public class NegociosController : Controller
    {


        // GET: Negocios/Negocio
        public ActionResult Index()
        {
            return View();
        }

        public PartialViewResult VistaParcialDatosNegocio()
        {
            return PartialView();
        }
        public PartialViewResult VistaParcialProductos()
        {

            return PartialView();
        }

        public PartialViewResult VistaParcialPedidos()
        {

            return PartialView();
        }


        public PartialViewResult ModalAgregarProducto()
        {
            return PartialView();
        }

        public PartialViewResult ModalVerPedido()
        {
            return PartialView();
        }

        public JsonResult Get_AllNegocios()
        {
            appUEntities1 db = new appUEntities1();
            bool proxy = db.Configuration.ProxyCreationEnabled;
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                List<negocios> negocio = db.negocios.Where(x => x.fkUsuario == 1).ToList();

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


        public JsonResult NegocioActual()
        {
            appUEntities1 db = new appUEntities1();
            bool proxy = db.Configuration.ProxyCreationEnabled;
            //cookie usuarioLogueado
            int idUsuario = Convert.ToInt32(Request.Cookies["LoginID"].Value);
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                negocios negocio = db.negocios.Where(x => x.fkUsuario == idUsuario).First();

                //creamos cookie idNegocio
                if (Session["negocioId"] == null)
                {
                    Session["negocioId"] = negocio.idNegocio;
                }

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
            using (appUEntities1 Obj = new appUEntities1())
            {
                int EmpId = int.Parse(Id);
                return Json(Obj.negocios.Find(EmpId), JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>  
        /// Insert New negocioe  
        /// </summary>  
        /// <param name="negocio"></param>  
        /// <returns></returns>  
        public string InsertNegocio(negocios negocio)
        {
            var file = Request.Files[0];
            string fileName;
            if (negocio != null)
            {
                //cookie usuarioLogueado
                int idUsuario = Convert.ToInt32(Request.Cookies["LoginID"].Value);
                fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                file.SaveAs(Path.Combine(Server.MapPath("~/imagenesProductos"), fileName));
                using (appUEntities1 Obj = new appUEntities1())
                {
                    negocio.imgNegocio = fileName;
                    negocio.fkUsuario = idUsuario;
                    negocio.activo = true;
                    Obj.negocios.Add(negocio);
                    Obj.SaveChanges();

                    //creamos cookie idNegocio
                    if (Session["negocioId"] == null)
                    {
                        Session["negocioId"] = negocio.idNegocio;
                    }

                    return "negocioe Added Successfully";
                }
            }
            else
            {
                return "negocioe Not Inserted! Try Again";
            }
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
                using (appUEntities1 Obj = new appUEntities1())
                {
                    var Neg_ = Obj.Entry(Neg);
                    if (Neg_.State == System.Data.Entity.EntityState.Detached)
                    {
                        Obj.negocios.Attach(Neg);
                        Obj.negocios.Remove(Neg);
                    }
                    Obj.SaveChanges();
                    return "negocioe Deleted Successfully";
                }
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
        public string UpdateNegocio(negocios Neg)
        {
            var file = Request.Files[0];
            string fileName;
            if (Neg != null)
            {
                fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
                file.SaveAs(Path.Combine(Server.MapPath("~/imagenesProductos"), fileName));
                using (appUEntities1 Obj = new appUEntities1())
                {
                    var Neg_ = Obj.Entry(Neg);
                    negocios negObj = Obj.negocios.Where(x => x.idNegocio == Neg.idNegocio).FirstOrDefault();
                    negObj.nombre = Neg.nombre;
                    negObj.calle = Neg.calle;
                    negObj.numero = Neg.numero;
                    negObj.colonia = Neg.colonia;
                    negObj.ciudad = Neg.ciudad;
                    negObj.imgNegocio = fileName;
                    negObj.permitePagosTarjeta = Neg.permitePagosTarjeta;
                    negObj.precioEnvio = Neg.precioEnvio;
                    negObj.descripcion = Neg.descripcion;
                    negObj.correo = Neg.correo;
                    negObj.codigoPostal = Neg.codigoPostal;
                    Obj.SaveChanges();
                    return "negocio Updated Successfully";
                }
            }
            else
            {
                return "negocio Not Updated! Try Again";
            }
        }
    }

      
}