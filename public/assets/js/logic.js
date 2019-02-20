Array.matrix = function(numrows, numcols, initial){
    var arr = [];
    for (var i = 0; i < numrows; ++i){
       var columns = [];
       for (var j = 0; j < numcols; ++j){
          columns[j] = initial;
       }
       arr[i] = columns;
     }
     return arr;
 }



 var yearAll = $("#year")[0].children[0].children[0];
        var yearFE = $("#year")[0].children[0].children[1];
        var yearSE = $("#year")[0].children[0].children[2];
        var yearTE = $("#year")[0].children[0].children[3];
        var yearBE = $("#year")[0].children[0].children[4];
        var branchCE = $("#branch")[0].children[0].children[0];
        var branchIT = $("#branch")[0].children[0].children[1];
        var branchETC = $("#branch")[0].children[0].children[2];
        var division1 = $("#branch")[0].children[0].children[0];
        var division2 = $("#branch")[0].children[0].children[1];
        var division3 = $("#branch")[0].children[0].children[2];
        var division4 = $("#branch")[0].children[0].children[3];
        var batch1 = $("#batch")[0].children[0].children[0];
        var batch2 = $("#batch")[0].children[0].children[1];
        var batch3 = $("#batch")[0].children[0].children[2];
        var batch4 = $("#batch")[0].children[0].children[3];


 var selection = Array.matrix(5,4,true);

        

       

 function check(){
        
 }