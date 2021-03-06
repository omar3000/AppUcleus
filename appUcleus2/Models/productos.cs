//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace appUcleus2.Models
{
    using System;
    using System.Collections.Generic;
    using System.Runtime.Serialization;
    using System.Web.Script.Serialization;


    [DataContract(IsReference = true)]
    public partial class productos
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public productos()
        {
            this.detalleVenta = new HashSet<detalleVenta>();
        }
    
        public int idProducto { get; set; }
        public string producto { get; set; }
        public string descripcion { get; set; }
        public string imgProducto { get; set; }
        public bool activo { get; set; }
        public decimal precio { get; set; }
        public Nullable<int> fkNegocio { get; set; }
        public Nullable<System.DateTime> fechaRegistro { get; set; }
        public int fkCategoria { get; set; }
    
        public virtual categorias categorias { get; set; }
        [ScriptIgnore]
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<detalleVenta> detalleVenta { get; set; }
        [ScriptIgnore]
        public virtual negocios negocios { get; set; }
    }
}
