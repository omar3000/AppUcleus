using appUcleus2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace appUcleus2.Controllers
{
    public class CategoriaController : Controller
    {
        public JsonResult traerCategorias()
        {
            appUEntities1 db = new appUEntities1();
            bool proxy = db.Configuration.ProxyCreationEnabled;
            try
            {
                db.Configuration.ProxyCreationEnabled = false;
                List<categorias> cat = db.categorias.ToList();
                //ViewBag.productos = productos;
                return Json(cat, JsonRequestBehavior.AllowGet);
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

        public ActionResult seleccioarCategoria(string idCat)
        {
            int idCategoria = Convert.ToInt32(idCat);
            Session.Remove("categoria");
            //creamos cookie categoria
            Session["categoria"] = idCategoria;
            return new RedirectResult(@"~\Home\Index\");
        }
    }
}