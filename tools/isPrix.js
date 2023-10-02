function isPrix(prix){
    if(isNaN(prix) || !prix){
        return false;
    }
    return true;
}

module.exports = isPrix;