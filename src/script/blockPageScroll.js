
const blockScroll = {
    block: ()=>{
        console.log('block')
        localStorage.setItem('isScrollLocked', true)
    },
    unblock: ()=> {
        console.log('unblock')
        localStorage.setItem('isScrollLocked', false)
    },
    toggleBlock: function(){
        if(this.isBlocked()){
            this.unblock()
        }else{
            this.block()
        }
    },
    isBlocked: ()=> {

        return JSON.parse(localStorage.getItem('isScrollLocked'))
    },
};

blockScroll.unblock()