using Accord.MachineLearning.DecisionTrees;
using appUcleus2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace appUcleus2.Controllers
{
    public class ProdController : Controller
    {
        appUEntities1 db = new appUEntities1();

        // GET: Prod
        public ActionResult GetData(negocios neg)
        {
            db.Configuration.ProxyCreationEnabled = false;
            int idNegocio = neg.idNegocio;
            try
            {
                if (idNegocio != 0)
                {
                    Session.Remove("neg");
                    //creamos cookie negocio
                    Session["neg"] = idNegocio;
                    return new RedirectResult(@"~\Prod\Index\");
                }
                else
                {
                    return new RedirectResult(@"~\Home\Index\");
                }
                //return View();
            }
            catch (Exception e)
            {
                return View(e);
            }
            
        }

        public JsonResult GetProductosNegocio()
        {
           
            bool proxy = db.Configuration.ProxyCreationEnabled;
            try
            {
                //cookie negocioid
                int idNegocio = Convert.ToInt32(Session["neg"]);

                db.Configuration.ProxyCreationEnabled = false;
                List<productos> productos = db.productos.Where(x => x.fkNegocio == idNegocio && x.activo).ToList();
                //ViewBag.productos = productos;
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

      

        public ActionResult Index()
        {
            
            return View();
        }
    }
}