const express=require("express");
const fs= require("fs");
const PORT=8899;
const app=express();
app.use(express.urlencoded({extended:false}))//parse
app.use(express.json())//for object

app.set("view engine","pug");
app.set("views","./views");

//for accessing style.css
// app.use(express.static('public')); 
app.use("/static",express.static('public'));
app.use("/images",express.static('images'));


//postdata functions
const postdata = (req,res)=>{
    let name=req.body.name;
    let email=req.body.email;
    let message=req.body.message;

    console.log(`${email}`)

    let userDetaills=name+","+email+","+message+"\n";
    if(fs.existsSync("users/contactDetails.txt")){
                fs.appendFile("users/contactDetails.txt",`${userDetaills}`,(err)=>{
                    if (err) throw err
                     else   res.redirect("/contactDetails")
              });
       }
    }
//contactDetails functions
const contactDetails=(req, res) => {
    const data = fs.readFileSync('users/contactDetails.txt', 'UTF-8').split("\n");
    const result = data.map(ele=>{
        const d = ele.split(',');
        return {name:d[0],email:d[1], message:d[2]}
    })
                res.render("contactDetails",{result:result})
        }
//galary function
const galary=(req,res)=>{
    let dataGalary={
        heading1:"This is galary heading1",
        heading2:"This is galary heading2"
    }
    res.render("galary",{dataGalary})
}
//services function
const services=(req,res)=>{
    let dataServices={
        heading:"Services",
        service1:{data:"Ecommerce"}
    }
    res.render("services1",{dataServices})
}


app.get("/",(req,res)=>{
   
    let headdata={
        head1:"Welcome to our Studio",
        head2:"ITS NICE TO MEET YOU",
        btnName:"SUSCRIBES"
    }
    
    res.render("index",{headdata})
})
app.get("/aboutUs",(req,res)=>{
    let leftBlock1={
            line1:"We are not different.",
            line2:"We lead by creating",
            line3:"a difference"
    }
    let rightBlock1={
        para:"Engineering ideas to improvise lives, NeoSOFT over the past 25 years, has empowered ambitious change-makers around the world with sustained digital capabilities. We are a trusted Digital Engineering and Enterprise Modernization partner with offerings that enable our clients’ by creating a unique competitive advantage. While leaving room for continuous enhancement, NeoSOF."
    }
    let block2={
        head:"Leading by Passion. Driven by Innovation",
        passion1:{
            content1:4000,
            content2:"Talent Pool"
        },
        passion2:{
            content1:1500,
            content2:"Products Engineered"
        },
        passion3:{
            content1:2200,
            content2:"Happy Clients"
        },
        passion4:{
            content1:3000,
            content2:"Industries Served"
        }
    }

    res.render("aboutUs",{leftBlock1,rightBlock1,block2})
})
app.get("/services1",services)


app.get("/galary",galary)

app.get("/contactUs",(req,res)=>{
    res.render("contactUs")
})

app.post("/postdata",postdata)

app.get('/contactDetails',contactDetails) 

app.listen(PORT,(err)=>{
    if(err) throw err
    else console.log(`Server work on ${PORT}`)
})