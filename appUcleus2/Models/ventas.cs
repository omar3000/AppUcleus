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
    public partial class ventas
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ventas()
        {
            this.detalleVenta = new HashSet<detalleVenta>();
        }
    
        public int idventa { get; set; }
        public System.DateTime fechaPedido { get; set; }
        public Nullable<System.DateTime> fechaPreparado { get; set; }
        public Nullable<System.DateTime> fechaentregado { get; set; }
        public Nullable<System.DateTime> fechaCancelado { get; set; }
        public int fkUsuarioPedido { get; set; }
        public int fkNegocio { get; set; }
        public int fkubicacionPedido { get; set; }
        public Nullable<int> fkUsuarioRepartidor { get; set; }
        public Nullable<int> fkubicacionRepartidor { get; set; }
        public decimal total { get; set; }
        public Nullable<int> estatus { get; set; }
        public Nullable<bool> pagoConTarjeta { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<detalleVenta> detalleVenta { get; set; }
        [ScriptIgnore]
        public virtual negocios negocios { get; set; }
        public virtual ubicaciones ubicaciones { get; set; }
        public virtual ubicaciones ubicaciones1 { get; set; }
        public virtual usuarios usuarios { get; set; }
        public virtual usuarios usuarios1 { get; set; }
    }
}
