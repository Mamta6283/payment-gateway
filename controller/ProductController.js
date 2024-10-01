const sqlConnect=require('../database')

class Products
{
    Add_Product(req,res)
    {
        if(req.method==='GET')
        {
            res.render('AddProducts')
            res.end()
        }
        else{
            sqlConnect.getConnection((err,myconnection)=>{
                if(err)
                {
                    res.send(err)
                    res.end()
                }
                else{
                    const q=`insert into product(name,price,photo,description) values('${req.body.name}','${req.body.price}','${req.file.filename}','${req.body.description}')`
                    myconnection.query(q,(err)=>{
                        if(err)
                        {
                            res.send(err)
                            res.end()
                        }
                        else{
                            res.render('AddProducts',{message:req.body.name+"added successfully"})
                            res.end()
                        }
                    })
                }
            })
        } 
    }
    Fetch_Products(req,res)
    {
          sqlConnect.getConnection((err,myconnection)=>{
            if(err)
            {
                res.send(err)
                res.end()
            }
            else{
                const q=`select * from product`
                myconnection.query(q,(err,data)=>{
                    if(err)
                    {
                        res.send(err)
                        res.end()
                    }
                    else{
                        res.render("Products",{record:data})
                        res.end()
                    }
                })
            }
          })
    }
    
    Buy_Products(req,res)
    {
        const Product_id=req.body.id
        const product_name=req.body.name
        const product_price=req.body.price 
        const quantity=req.body.quantity
        const total=req.body.total
        res.render('checkout',{final_amount:total,product_id:Product_id,ProductName:product_name,quantity:quantity,product_price:product_price})

    }
    Status(req,res)
{
      const message=req.query.status;
      res.render('Payment',{message:message})
      res.end()
}
}


const obj=new Products()
module.exports=obj