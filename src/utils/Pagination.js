const {LISTING_MAX_BATCH_SIZE}= require('./constant')

module.exports =class Pagination{
    constructor() {
    console.log('Pagination class executed'); 
    this.defaultLimit = LISTING_MAX_BATCH_SIZE; 
    this.defaultPage = 1;  
    }
    
    getNumberOfPages (count = 0, limit = 0) { 
    if (count > 0) { 
    count/=limit;
    const pages = Math.ceil(count);
    return pages;
    } 
    return 1;
    }
    
    getOffsetLimit (page='', limit =''){
        console.log(limit,page,'page===')
    if (page ==='' || page === undefined) {
     page= 1;  
    }
    
    if (limit==='' || limit === undefined) {
    limit= this.defaultLimit;
    }
        
    page=page < 0 ? 1 : page;
    limit =limit < 0 ? 1 : limit;
    
    limit = limit > this.defaultLimit? this.defaultLimit:limit
    
    let offset = page === 1 ?0: (page * limit) - limit;
    
    limit = parseInt(limit); 
    offset = parseInt(offset);
    
    return { 
        offset, limit,
    
    };
    
    }
    paginate(data, counts, limit) {
return {
    data,
    totalCounts:parseInt(counts),
    pages: this.getNumberOfPages(counts,limit)
}
    }
}
