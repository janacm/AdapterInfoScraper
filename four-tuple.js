/**
 =========== 4-Tuple Object ======= 
 Made from scratch by Janac Meena, using vanilla JS. 

**/
function Tuple (a,b,c,d){
    this.a=a;
    this.b=b;
    this.c=c;
    this.d=d;
}

Tuple.prototype.getTuple = function(){
        return this.a.toString() + "-" + this.b.toString() + "-" + this.c.toString() + "-" + this.d.toString();
};

Tuple.prototype.compareTo = function(t){
    if (this.a > t.a){
        return 1;
    }else if (this.a < t.a){
        return -1;
    }else{
        if (this.b > t.b){
            return 1;
        }else if (this.b < t.b){
            return -1;
        }else{
            if (this.c > t.c){
                return 1;
            }else if (this.c < t.c){
                return -1;
            }else{
                if (this.d > t.d){
                    return 1;
                }else if (this.d < t.d){
                    return -1;
                }else{
                    return 0;
                }
            }
        }
    }
}

Tuple.prototype.toString = function(){
    return this.a.toString() + "-" + this.b.toString() + "-" + this.c.toString() + "-" + this.d.toString();
    // Tuple.prototype.getTuple();
}

/**
Some test code
**/

// var myLittleTupy = new Tuple(2,2,2,4);
// var tup2 = new Tuple(2,2,2,5);
// alert(myLittleTupy.compareTo(tup2));