using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DemoApp.api.Models;

namespace DemoApp.api.Controllers
{
    public class CustomersController : ApiController
    {

       static List<Customer> customers = new List<Customer> {
                new Customer {Id=0, Name= "Jams bond", Address="Dhanmondi", Phone="+8801676585956" },
                new Customer {Id=1, Name= "Bob Mart", Address="Dhanmondi1", Phone="+8801676585957" },
                new Customer {Id=2, Name= "Adam", Address="Dhanmondi2", Phone="+8801676585958" }
            };

        // GET api/values
        public HttpResponseMessage Get()
        {
            //  return customers;

            return Request.CreateResponse(HttpStatusCode.OK, new {data = customers} );
        }

        // GET api/values/5
        public Customer Get(int id)
        {
            return customers.First(x => x.Id == id);
        }

        // POST api/values
        public HttpResponseMessage Post([FromBody]Customer value)
        {
            value.Id = customers.Count;
            customers.Add(value);
            var msg = Request.CreateResponse(
                HttpStatusCode.Created);
            return msg;
        }

        // PUT api/values/5
        public HttpResponseMessage Put(int id, [FromBody]Customer value)
        {
            customers[id] = value;
            var msg = Request.CreateResponse(
              HttpStatusCode.OK);
            return msg;
        }

        // DELETE api/values/5
        public HttpResponseMessage Delete(int id)
        {
            customers.Remove(customers.FirstOrDefault(x => x.Id == id));
            var msg = Request.CreateResponse(
              HttpStatusCode.NoContent);
            return msg;
        }
    }
}
