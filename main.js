
// I am referencing my previous project in vuejs to start up quick


// number of weeks in year 52.1429 (52)
// number of weeks in 90 years 4692.861 (4680)
// lets take less weeks number
var numberOfWeeksInYear = 52 ;
var lifeTime = 90; // years

// birthdate
birthdate = new Date('01/01/2000');

today = new Date();

// get weeks passed by till now
noOfWeeksLapsed = (today - birthdate) / (1000*60*60*24*7);

widthOffset = 3;
heightOffset = 3.2;


// display in blocks

console.log(noOfWeeksLapsed);


var app = new Vue({

    el: '#app',

    data: {
        cellWidth : parseInt(window.innerWidth/numberOfWeeksInYear)-widthOffset,
        cellHeight : parseInt(window.innerHeight/lifeTime)-heightOffset,
        arr : [],

        birthdate : new Date('01/01/2000')
    },

    methods: {
        createNDArray: function() {
            console.log(this.cellWidth)
            if (this.arr.isEmpty) 
                this.arr = new Float32Array(lifeTime);
            for (var i = 0; i < lifeTime; i++) {
                this.arr[i] = new Float32Array(numberOfWeeksInYear);

                for (var j = 0; j < numberOfWeeksInYear; j++) {
                    if (noOfWeeksLapsed > 0) {
                        if (noOfWeeksLapsed < 1) {
                            this.arr[i][j] = noOfWeeksLapsed;
                            noOfWeeksLapsed = noOfWeeksLapsed - 1
                            continue
                        }
                        noOfWeeksLapsed = noOfWeeksLapsed - 1
                        this.arr[i][j] = 1.0;
                    }
                    else 
                        this.arr[i][j] = 0.0;
                }
            }
        },
        onResize() {
            this.cellWidth = parseInt(window.innerWidth/numberOfWeeksInYear)-widthOffset;
            this.cellHeight = parseInt(window.innerHeight/lifeTime)-heightOffset;
        }
    },

    computed: {
        cellStyle: function() {
            console.log("here")
            return {
                height: this.cellHeight + 'px',
                width: this.cellWidth + 'px',
                'border-style': 'solid',
                'border-width': '0.5px',
            }
        }
    },

    beforeMount() {
        this.createNDArray();
        console.log(this.arr);
    },

    mounted() {
        this.$nextTick(() => {
        window.addEventListener('resize', this.onResize);
        })
    },

    beforeDestroy() { 
        window.removeEventListener('resize', this.onResize); 
    },
});