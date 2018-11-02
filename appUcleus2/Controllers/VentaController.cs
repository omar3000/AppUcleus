using appUcleus2.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace appUcleus2.Controllers
{
    public class VentaController : Controller
    {
        appUEntities1 Obj = new appUEntities1();

        public ActionResult pedidos()
        {
            return View();
        }

        public PartialViewResult ModalVerPedido()
        {
            return PartialView();
        }

        // GET: Venta
        public ActionResult carrito()
        {
            //cookie idventa carrito
            var myCookielog = Request.Cookies["IdVenta"];
            //int idVenta = Convert.ToInt32(Request.Cookies["IdVenta"].Value); 

            if (myCookielog == null)
            {
                return View("../Home/Index");
            }
            else
            {
                return View();
            }
        }

        public JsonResult TraerCarrito()
        {
            bool proxy = Obj.Configuration.ProxyCreationEnabled;
            try
            {
                Obj.Configuration.ProxyCreationEnabled = false;
                //cookie usuarioLogueado 
                int idUsuario = Convert.ToInt32(Request.Cookies["LoginID"].Value);

                //cookie idventa carrito
                int idVenta = Convert.ToInt32(Request.Cookies["IdVenta"].Value);

                //int venta = db.ventas.Where(x => x.fkUsuarioPedido == 1 && x.estatus == 0).FirstOrDefault().idventa;
                List<detalleVenta> dv = Obj.detalleVenta.Where(x => x.fkVenta == idVenta).ToList();

                ventas venta = Obj.ventas.Where(x => x.idventa == idVenta).FirstOrDefault();
                List<productos> productosDv = new List<productos>();
                List<productos> ListProductos = Obj.productos.Where(x => x.fkNegocio == venta.fkNegocio && x.activo).ToList();   
                foreach( detalleVenta detalle in dv )
                {
                    productos producto = ListProductos.Where(x => x.idProducto == detalle.fkProducto).FirstOrDefault();
                    if(producto != null)
                           productosDv.Add(producto);
                }
                  
                //falta traer los productos ligados al detalle venta
                

                return Json(productosDv, JsonRequestBehavior.AllowGet);
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



        public JsonResult traerCantidad(string idPro)
        {
            appUEntities1 db = new appUEntities1();
            bool proxy = Obj.Configuration.ProxyCreationEnabled;
            try
            {
                Obj.Configuration.ProxyCreationEnabled = false;
                int idP = Convert.ToInt32(idPro);
                decimal total = 0;
               
                //cookie idventa carrito
                //cookie idventa carrito
                var myCookielog = Request.Cookies["IdVenta"];
                //int idVenta = Convert.ToInt32(Request.Cookies["IdVenta"].Value); 

                if (myCookielog == null)
                {
                    var result = new { cantidad = 0, total = total };
                    return Json(result, JsonRequestBehavior.AllowGet);
                }

                int idVenta = Convert.ToInt32(Request.Cookies["IdVenta"].Value);
                detalleVenta dv = Obj.detalleVenta.Where(x => x.fkVenta == idVenta && x.fkProducto == idP).FirstOrDefault();
                ventas venta = Obj.ventas.Where(z => z.idventa == idVenta).FirstOrDefault();

                total = venta.total;
                
                if (dv == null)
                {
                    var result = new { cantidad = 0, total = total };
                    return Json(result, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    var result = new { cantidad = dv.cantidad, total = total };
                    return Json(result, JsonRequestBehavior.AllowGet);
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


        public void EnviarPedido()
        {
            //cookie idventa carrito
            int idVenta = Convert.ToInt32(Request.Cookies["IdVenta"].Value);

            ventas venta = Obj.ventas.Find(idVenta);
            venta.fechaPedido = DateTime.Now;
            venta.estatus = 1;
            Obj.SaveChanges();

            Request.Cookies["IdVenta"].Value = "";
            Request.Cookies["IdVenta"].Expires = DateTime.Now.AddDays(-1D);
            Response.Cookies.Add(Request.Cookies["IdVenta"]);
        }

        public string actualizarCantidad(string idPro,  int cantidad)
        {
            //cookie idventa carrito
            int idVenta = Convert.ToInt32(Request.Cookies["IdVenta"].Value);

            int idNegocio = Obj.ventas.Where(x => x.idventa == idVenta).FirstOrDefault().fkNegocio;

            int idP = Convert.ToInt32(idPro);

            detalleVenta dv = Obj.detalleVenta.Where(x => x.fkVenta == idVenta && x.fkProducto == idP).FirstOrDefault();

            dv.cantidad = dv.cantidad + cantidad;

            if (dv.cantidad < 1)
            {
                eliminarProductoCarrito(dv);
            }
            else
            {
                Obj.SaveChanges();
                updateVenta(idVenta, cantidad * dv.precio, idNegocio);
            }
            return "";
        }


        private void  eliminarProductoCarrito(detalleVenta dv)
        {

            List<detalleVenta> detalle = Obj.detalleVenta.Where(x => x.fkVenta == dv.fkVenta).ToList();
            ventas ventaEliminar = Obj.ventas.Find(dv.fkVenta);
            if (detalle.Count == 1)
            {
                Obj.Entry(dv).State = EntityState.Deleted;
                Obj.Entry(ventaEliminar).State = EntityState.Deleted;
                Request.Cookies["IdVenta"].Value = "";
                Request.Cookies["IdVenta"].Expires = DateTime.Now.AddDays(-1D);
                Response.Cookies.Add(Request.Cookies["IdVenta"]);

            }
            else
            {
                updateVenta(dv.fkVenta, -1 * dv.precio, ventaEliminar.fkNegocio);
                Obj.Entry(dv).State = EntityState.Deleted;
                Obj.SaveChanges();
            }
                       
 
        }


        public int Insert_producto_carrito(productos pro)
        {
            if (pro != null)
            {
                //cookie idventa carrito
                var myCookievent = Request.Cookies["IdVenta"];
                int idVenta;
                int salida = 1;
                if (myCookievent == null)
                {
                    idVenta = insertarNuevaVenta(pro.precio, Convert.ToInt32(pro.fkNegocio));
                    //creamos cookie idVenta del carrito
                    HttpCookie cookie = new HttpCookie("IdVenta");
                    cookie.Value = Convert.ToString(idVenta);
                    cookie.Expires = DateTime.Now.AddMinutes(60);
                    Response.Cookies.Add(cookie);

                    salida = 2;
                }
                else
                {
                    idVenta = Convert.ToInt32(Request.Cookies["IdVenta"].Value);
                    if (!updateVenta(idVenta, pro.precio, Convert.ToInt32(pro.fkNegocio)))
                    {
                        return 0;
                    }
                }
                detalleVenta dvp = Obj.detalleVenta.Where(x => x.fkProducto == pro.idProducto && x.fkVenta == idVenta).FirstOrDefault();

                if (dvp != null)
                {
                    dvp.cantidad = dvp.cantidad + 1;
                }
                else
                {
                    detalleVenta dv = new detalleVenta();
                    dv.precio = pro.precio;
                    dv.observacion = "";
                    dv.cantidad = 1;
                    dv.fkProducto = pro.idProducto;
                    dv.fkVenta = idVenta;

                    Obj.detalleVenta.Add(dv);

                }
                Obj.SaveChanges();

                return salida;
            }
            else
            {
                return -1;
            }
        }
         
        private int insertarNuevaVenta(decimal precio, int negocio)
        {
            //cookie usuarioLogueado
            int idUsuario = Convert.ToInt32(Request.Cookies["LoginID"].Value);

            ventas venta = new ventas();
            venta.estatus = 0;
            venta.fechaPedido = DateTime.Now;
            venta.fkNegocio = negocio;
            venta.fkUsuarioPedido = idUsuario;
            venta.total = precio;

            //variable temporal 
            venta.fkubicacionPedido = 1;


            Obj.ventas.Add(venta);
            Obj.SaveChanges();
            return venta.idventa;
        }

        private bool updateVenta(int idVenta, decimal precio, int idNegocio)
        {
            ventas venta = Obj.ventas.Find(idVenta);
            if (venta.fkNegocio != idNegocio)
            {
                return false;
            }
            else
            {
                venta.total = venta.total + (precio);
                venta.fechaPedido = DateTime.Now;
                Obj.SaveChanges();

            }
            return true;
        }

        public JsonResult PedidosCliente()
        {
            //cookie usuarioLogueado
            int idUsuario = Convert.ToInt32(Request.Cookies["LoginID"].Value);
            bool proxy = Obj.Configuration.ProxyCreationEnabled;
            try
            {

                Obj.Configuration.ProxyCreationEnabled = false;
                List<ventas> Lventas = Obj.ventas.Where(x => x.estatus > 0 && x.fkUsuarioPedido == idUsuario).ToList();

                return Json(Lventas, JsonRequestBehavior.AllowGet);
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
    }
 
}