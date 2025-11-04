import { Injectable } from '@nestjs/common';
import { updateCustomerStatusDto } from './Dtos/UpdateCustomerStatus.dto';
import { updateVendorStatus } from './Dtos/UpdateVendorStatus.dto';
import { GetVendorDto } from './Dtos/GetVendro.dto';

@Injectable()
export class AdminService {
    private vendors = [
  {
    "id": "1",
    "name": "Rafi Hasan",
    "email": "rafi.hasan@gmail.com",
    "role": "vendor",
    "status": "pending",
  },
  {
    "id": "2",
    "name": "Nusrat Jahan",
    "email": "nusrat.jahan@gmail.com",
    "role": "vendor",
    "status": "approved",
    
  },
  {
    "id": "3",
    "name": "Mehedi Rahman",
    "email": "mehedi.dev@gmail.com",
    "role": "vendor",
    "status": "rejected",
  
  }, 
   {
    "id": "4",
    "name": "pritom das",
    "email": "pritom@gmail.com",
    "role": "vendor",
    "status": "pending",
  },
]

private customers = [
  {
    "id": "1",
    "name": "Tanvir Alam",
    "email": "tanvir.alam@gmail.com",
    "role": "customer",
    "totalBookings": 5,
    "totalSpent": 4200,
    "status": "unblocked"
  },
  {
    "id": "2",
    "name": "Rima Khatun",
    "email": "rima.khatun@gmail.com",
    "role": "customer",
    "totalBookings": 2,
    "totalSpent": 1500,
    "status": "blocked"
  },
  {
    "id": "3",
    "name": "Shahriar Hossain",
    "email": "mim.akter@gmail.com",
    "role": "customer",
    "totalBookings": 8,
    "totalSpent": 7200,
    "status": "unblocked"
  },
  {
    "id": "4",
    "name": "Mim Akter",
    "email": "mim.akter@gmail.com",
    "role": "customer",
    "totalBookings": 1,
    "totalSpent": 300,
    "status": "blocked"
  }
]
// all the function of customer
findallcustomer(status?: 'blocked' | 'unblocked'){
  if(status){
    return this.customers.filter(customer => customer.status === status)
  }
return this.customers
}


findOnecustomer(id : string){
  const customer = this.customers.find(customer => customer.id === id)
  return customer
}

updateCustomerstatus(id:string, updatestatus:updateCustomerStatusDto){
  this.customers = this.customers.map(customer =>{
    if(customer.id === id){
      return {...customer,status:updatestatus.status}
    }
    return customer
  })
  return this.customers.find(customer => customer.id === id);
}

deleteAcustomer(id:string){
  return this.customers.filter(customer => customer.id !== id)
}
/////////////......................................................................................................../////////////////
// alll the functions of vendors
 findAllVendor(getvendordto : GetVendorDto){
  const {status} = getvendordto
  if(status){
    return this.vendors.filter(vn => vn.status === status)
  }
    return this.vendors
 }

findOneVendor(id:String){
    const vendor = this.vendors.find(vendor => vendor.id === id)
    return vendor;
}

getAllVendorRequest(){
    const vendorsRuests = this.vendors.filter((vendor) => vendor.status === 'pending')
    return vendorsRuests;
}

updateVendorStatus(id:string,updatestatus:updateVendorStatus){
        this.vendors = this.vendors.map((vendor) =>{
            if(vendor.id === id){
                return{...vendor,status:updatestatus.status}
            }
            return vendor;
        })
        return  this.vendors.find(vendor => vendor.id === id)
    }

 DeleteVendor(id:string){
    return this.vendors.filter((vendor) => vendor.id !== id)
 }   


}
