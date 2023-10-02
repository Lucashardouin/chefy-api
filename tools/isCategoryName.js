function isCategoryName(category){
    if(!category || category.length < 2 || category.length > 15){
        return false;
    }
    return true;
}

module.exports = isCategoryName;