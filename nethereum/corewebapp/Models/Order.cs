using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace corewebapp.Models
{
    public class Order
    {
        public string Id { get; set; }

        public string Sku { get; set; }

        public string ManufacturerId { get; set; }

        public string LabelProducerId { get; set; }

        public string PackagerId { get; set; }

        public int Quantity { get; set; }
    }
}
