export const profile = async(req,res) => {
    res.send(req.user)
}