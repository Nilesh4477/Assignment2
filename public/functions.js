//postdata functions
let postdata = (req,res)=>{
    let name=req.body.name;
    let email=req.body.email;
    let message=req.body.message;

    let userDetaills=name+","+email+","+message+"\n";
    if(fs.existsSync("users/contactDetails.txt")){
                fs.appendFile("users/contactDetails.txt",`${userDetaills}`,(err)=>{
                    if (err) throw err
                     else   res.redirect("/contactUs")
              });
       }
    }
//contactDetails functions
let contactDetails=(req, res) => {
    const data = fs.readFileSync('users/contactDetails.txt', 'UTF-8').split("\n");
    const result = data.map(ele=>{
        const d = ele.split(',');
        return {name:d[0],email:d[1], message:d[2]}
    })
                res.render("contactDetails",{result:result})
        }
//galary function

let galary=(req,res)=>{
    let dataGalary={
        heading1:"This is galary heading1",
        heading2:"This is galary heading2"
    }
    res.render("galary",{dataGalary})
}
//services function
let services=(req,res)=>{
    let dataServices={
        heading:"Services",
        service1:{data:"Ecommerce"}
    }
    res.render("services1",{dataServices})
}

exports.postdata;
exports.contactDetails;
exports.galary;
exports.services;

//module.exports={postdata:postdata,contactDetails:contactDetails}