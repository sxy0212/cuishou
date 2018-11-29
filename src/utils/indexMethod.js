function indexMethod(val,page,pageSize){
    return (page-1) * pageSize + val + 1
}
export default indexMethod