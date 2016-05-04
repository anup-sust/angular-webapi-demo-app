using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DemoApp.api.Models
{
    public class Customer
    {
        public long Id { get; set; }
        public String Name { get; set; }
        public String Address { get; set; }
        public String Phone { get; set; }
    }
}