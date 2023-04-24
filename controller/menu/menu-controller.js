const Menu = require('../../model/Menu')
const { Obj } = require('mongoose')

exports.creteMenu = (req, res) => {
    const { name, detail, type } = req.body
    switch(true) {
        case (!name):
            return res.status(400).json({ErrorMessage: "กรุณาป้อนชื่อเมนู"})
            break;
        case (!detail):
            return res.status(400).json({ErrorMessage: "กรุณาป้อนรายละเอียด"})
            break;
        case (!type):
            return res.status(400).json({ErrorMessage: "กรุณาป้อนประเภท"})
            break;
    }
    try {
        Menu.create({name, detail, type}).then(res => {
            // console.log(res);
        }).catch(err => console.log(err))
    } catch (error) {
        return res.status(400).json(error)
    }
}

exports.getMenu = (req, res) => {
    try {
        Menu.find().then(data => {
            return res.status(200).json(data)
        })
    } catch (error) {
        console.log(error);
    }
}

exports.getMenuById = (req, res) => {
    const { id } = req.params
    try {
        Menu.findOne({_id: id}).then((data) => {
            return res.status(200).json(data)
        })
    } catch (error) {
        return res.status(400).json(error)
    }
}

exports.updateMenuById = (req, res) => {
    const { id } = req.params
    const { name, detail, type } = req.body
    try {
        Menu.findOneAndUpdate({_id:id}, {
            $set: {
            name: name,
            detail: detail,
            type: type
            }
        }).then(data => {
            res.json({Success: 'แก้ไขเมนู '+id+' สำเร็จแล้ว'})
        }).catch(err => {
            console.log(err)
            return res.status(400).json({Error: err})
        })
        // Menu.findByIdAndUpdate({"_id": id},
        // {
        //     name: name,
        //     detail: detail,
        //     type: type
        // }, (err, menu) => {
        //     if(err) return res.status(400).json({Error:'อัพเดตไม่ได้'})
        //     res.json({Success: 'แก้ไขเมนู '+id+' สำเร็จแล้ว'})
        // })
    } catch (error) {
        return res.status(400).json(error)
    }
}

exports.deleteMenuById = (req, res) => {
    const { id } = req.params
    console.log(id);
    try {
        Menu.findOneAndDelete({"_id":id}).then((data) => {
            console.log(data);
            res.json({Success: 'ลบเมนู '+id+' สำเร็จแล้ว'})
        })
    } catch (error) {
        return res.status(400).json(error)
    }
}