using appUcleus2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace appUcleus2.Areas.Negocios.Controllers
{
    public class VentasController : Controller
    {

        appUEntities1 Obj = new appUEntities1();

        // GET: Negocios/Ventas
        public ActionResult Index()
        {
            return View();
        }


        public JsonResult TraerPedido(string idV)
        {
            bool proxy = Obj.Configuration.ProxyCreationEnabled;
            try
            {

                Obj.Configuration.ProxyCreationEnabled = false;
                int idVenta = Convert.ToInt32(idV);

                //int venta = db.ventas.Where(x => x.fkUsuarioPedido == 1 && x.estatus == 0).FirstOrDefault().idventa;
                List<detalleVenta> dv = Obj.detalleVenta.Where(x => x.fkVenta == idVenta).ToList();

                ventas venta = Obj.ventas.Where(x => x.idventa == idVenta).FirstOrDefault();
                List<productos> productosDv = new List<productos>();
                List<productos> ListProductos = Obj.productos.Where(x => x.fkNegocio == venta.fkNegocio && x.activo).ToList();
                foreach (detalleVenta detalle in dv)
                {
                    productos producto = ListProductos.Where(x => x.idProducto == detalle.fkProducto).FirstOrDefault();
                    if (producto != null)
                        productosDv.Add(producto);
                }

                negocios negocio = Obj.negocios.Where(x => x.idNegocio == venta.fkNegocio).FirstOrDefault();

                //falta traer los productos ligados al detalle venta
                var result = new { prod = productosDv, negocio = negocio, dv = dv, venta = venta };
                
                return Json(result, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(e.Message);
            }
            finally
            {
                Obj.Configuration.ProxyCreationEnabled = proxy;

            }
        }

        public JsonResult traerCantidad(string idPro, string idVe)
        {

            bool proxy = Obj.Configuration.ProxyCreationEnabled;
            try
            {
                Obj.Configuration.ProxyCreationEnabled = false;
                int idP = Convert.ToInt32(idPro);
                
                int idVenta = Convert.ToInt32(idVe);
                detalleVenta dv = Obj.detalleVenta.Where(x => x.fkVenta == idVenta && x.fkProducto == idP).FirstOrDefault();
                if (dv == null)
                {
                    return Json(0, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(dv.cantidad, JsonRequestBehavior.AllowGet);
                }


            }
            catch (Exception e)
            {
                return Json(e.Message);
            }
            finally
            {
                Obj.Configuration.ProxyCreationEnabled = proxy;

            }

        }

        public JsonResult PedidosNegocio()
        {
            appUEntities1 db = new appUEntities1();
            bool proxy = db.Configuration.ProxyCreationEnabled;
            try
            {
                //cookie negocioid
                int idNegocio = Convert.ToInt32(Session["negocioId"]);

                db.Configuration.ProxyCreationEnabled = false;
                List<ventas> ListVentas = db.ventas.Where(x => x.fkNegocio == idNegocio && x.estatus == 1).ToList();

                return Json(ListVentas, JsonRequestBehavior.AllowGet);
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
    }

}