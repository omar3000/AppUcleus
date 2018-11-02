using appUcleus2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Security.Cryptography;
using System.Text;

namespace appUcleus2.Controllers
{
    public class UsuarioController : Controller
    {
        // GET: Usuario
        public ActionResult Index()
        {
            return View();
        }

        // GET: /Login/  
        public ActionResult Login()
        {
            return View();
        }


        [HttpPost]
        public string Login(usuarios data)
        {
            string un = data.usuario;
            string Password = data.contraseña;
            using (appUEntities1 Obj = new appUEntities1())
            {
                var user = Obj.usuarios.Where(u => u.usuario == un).FirstOrDefault();
                if (user != null)
                {
                    if (GetMD5(Password) == user.contraseña)
                    {
                        //creamos cookie usuarioLogueado
                        HttpCookie cookie = new HttpCookie("LoginID");
                        cookie.Value = Convert.ToString(user.idUsuario);
                        cookie.Expires = DateTime.Now.AddMinutes(60);
                        Response.Cookies.Add(cookie);
                      
                        return user.idUsuario.ToString();
                    }
                    else
                    {
                        return "0";
                    }
                }
                else
                {
                    return "-1";
                }
            }
        }

        public ActionResult logon()
        {
            var myCookielog = Request.Cookies["LoginID"];
            if (myCookielog != null)
            {
                Request.Cookies["LoginID"].Value = "";
                Request.Cookies["LoginID"].Expires = DateTime.Now.AddDays(-1D);
                Response.Cookies.Add(Request.Cookies["LoginID"]);

                var myCookieCarrito = Request.Cookies["IdVenta"];
                if (myCookieCarrito != null)
                {
                    Request.Cookies["IdVenta"].Value = "";
                    Request.Cookies["IdVenta"].Expires = DateTime.Now.AddDays(-1D);
                    Response.Cookies.Add(Request.Cookies["IdVenta"]);
                }
            }
            return RedirectToAction("login");
        }


        /// <summary>  
        /// Insert New negocioe  
        /// </summary>  
        /// <param name="usuario"></param>  
        /// <returns></returns>  
        public string AgregarUsuario(usuarios User)
        {
            if (User != null)
            {
                using (appUEntities1 Obj = new appUEntities1())
                {
                   
                    User.apellidoMaterno = "x";
                    User.contraseña = GetMD5(User.contraseña);
                    User.fechaRegistro = DateTime.Now; 
                    
                    User.activo = true;
                    Obj.usuarios.Add(User);
                    Obj.SaveChanges();
                    return "1";
                }
            }
            else
            {
                return "-1";
            }
        }

        private static string GetMD5(string str)
        {
            MD5 md5 = MD5CryptoServiceProvider.Create();
            ASCIIEncoding encoding = new ASCIIEncoding();
            byte[] stream = null;
            StringBuilder sb = new StringBuilder();
            stream = md5.ComputeHash(encoding.GetBytes(str));
            for (int i = 0; i < stream.Length; i++) sb.AppendFormat("{0:x2}", stream[i]);
            return sb.ToString();
        }


    }
}