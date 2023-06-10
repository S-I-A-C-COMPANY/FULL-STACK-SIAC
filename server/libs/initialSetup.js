const Category = require('../model/categoryModel');
const Role = require("../model/roleModel");

const createRoles = async()=>{
try {
    const count = await Role.estimatedDocumentCount()

    if(count>0) return;

    const values = await Promise.all([
        new Role({name: "user"}).save(),
        new Role({name: "admin"}).save(),
        new Role({name: "Jefe Cocina"}).save(),
        new Role({name: "mesero"}).save()
    ])
    console.log(`data ${values}`.bgGreen.underline)
    } catch (error) {
        console.error(error)
     }
}




const createCategories = async () => {
  try {
    const count = await Category.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new Category({ name: 'All' }).save(),
    ]);

    console.log(`Categories data created: ${values}`);
  } catch (error) {
    console.error(error);
  }
};


module.exports = {
    createRoles,
    createCategories
}