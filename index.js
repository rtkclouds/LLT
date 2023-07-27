let fs = require('fs')
let tf = require('@tensorflow/tfjs-node')
let fsPath = require('fs-path')
const MessagePack = require('what-the-pack');
const {
  encode,
  decode
} = MessagePack.initialize(2 ** 30); // 4MB
/* let books = fsPath.findSync('/home/ckn/CORESingular/books/').files
let openOrca = fsPath.findSync('/home/ckn/live/data/dataset_files').files
let wizard = ['./data/w.json'] */
let gpt3 = require('gpt-3-encoder')
let loadBin = global.loadJSON = function (path) {
  if (fs.existsSync(path)) {
    let rawData = fs.readFileSync(path)
    try {
      let data = decode(rawData)
      return data
    } catch (e) {
      console.log('erro na leitura ', path)
      return false
    }


  }
  return false
}
let saveJSON = global.saveJSON = function (path, data) {

  try {
    let rawData = JSON.stringify(data)
    fsp.writeFileSync(path, rawData)
  } catch (e) {
    console.log('erro na gravação ', path)
    return false
  }



  return false
}
let saveBin = global.saveBin = function (path, data) {

  try {


    let y = encode(data)
    fs.writeFileSync(path, y)
  } catch (e) {
    (e)
    console.log(e)
    console.log('erro na gravação ', path)
    return false
  }



  return false
}
function convert(n) {
    let k = n.toString(2).padStart(10, '0')
    let arr = ['', '', '', '', '', '', '', '', '', '']
    k = k.split('').map((s, i) => arr[i % 10] += s)
    let y = arr.map(s => parseInt(s, 2))
    return y
}

function reverser(arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) {

    let x = arr.map(s => {
        let y = s.toString(2).padStart(10, '0')
        return y

    })
    let j = ''

    for (let k = 0; k < 10; k++) {
        for (let i = 0; i < 10; i++) {
            j += x[i][k]
        }


    }


    return parseInt(j, 2)

}





class Tree {
    constructor(length = 256, trees = 64, id = 'std') {
        this.index = []

        this.config = {
            length,
            trees,
            id
        }
        this.trees = {}
        this.start()
       
    }
    start() {
        this.tokens = loadJSON('./data/cl.json')
        this.groups = loadJSON('./data/cli.json')
        if (!this.tokens) this.genFile()
        this.data = loadJSON('tree-b-' + this.config.id)
        if (!this.data) {
            this.data = tf.randomNormal([this.config.length, 6, 10, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]).arraySync()
            saveBin('./data/tree-b-' + this.config.id, this.data)

        }
    }


    genFile() {
        let files = ['./data/base_class.tsv', './data/base2_class.tsv', './data/base3_class.tsv', './data/base3_class_32.tsv', './data/base2_class_32.tsv', './data/base_class_32.tsv']
        let v1 = files.map(s => fs.readFileSync(s).toString().split(/\n/g).map(s => s.split(' ')))
        let _ = require('lodash')
        let c = new Array(55000).fill(2954).map(s => [2954, 2954, 2954, 2954, 2954, 2954])
        let o = {}
        v1.map((s, i) => s.map(g => _.set(c, [g[0], i], g[1] / 1)))
        v1.map((s, i) => s.map(g => _.set(o, [g[1], g[0]], 1)))
        fs.writeFileSync('./data/cl.json', JSON.stringify(c))
        let a = new Array(1024).fill(0).map(s => [
            [],
            [],
            [],
            [],
            [],
            []
        ])
        for (let k = 0; k < v1.length; k++) {
            for (let c = 0; c < v1[k].length; c++) {
                let r = v1[k][c]

                let k1 = r[1] / 1 || 0
                let v = r[0] / 1 || 0

                if (a[k1][k]) a[k1][k].push(v / 1)
            }
        }
        fs.writeFileSync('./data/cli.json', JSON.stringify(a))
    }
    indexs(seq) {

        let res = []
        for (let k = 0; k < seq.length; k++) {
            let tokenClasses = []
            seq[k].map((s, i) => {
                let conv = convert(s)
                let resToken = []
                conv.map((b, p) => {
                    let res = this.data[k][i][p][conv[0]][conv[1]][conv[2]][conv[3]][conv[4]][conv[5]][conv[6]][conv[7]][conv[8]][conv[9]]
                    let bin = res[0] > res[1] ? 0 : 1
                    resToken.push(bin)
                })
                tokenClasses.push(reverser(resToken))

            })
            res.push(tokenClasses)
        }


        return res



    }
    _set(seq, val) {

        let res = []
        for (let k = 0; k < seq.length; k++) {
            let tokenClasses = []
            seq[k].map((s, i) => {
                let conv = convert(s)
            
                let conv2 = convert(val[i])
              
                let resToken = []
                conv.map((b, p) => {
                    let res = this.data[k][i][p][conv[0]][conv[1]][conv[2]][conv[3]][conv[4]][conv[5]][conv[6]][conv[7]][conv[8]][conv[9]][p]
                   

                    let bin = conv2[p]
                    this.data[k][i][p][conv[0]][conv[1]][conv[2]][conv[3]][conv[4]][conv[5]][conv[6]][conv[7]][conv[8]][conv[9]] += (bin - res) * .01

                   
                })
                

            })
           
        }




    }
    preprocess(seq) {
        if (seq.length < this.config.length) {
            seq = new Array(this.config.length - seq.length).fill(0).concat(seq)
        }
        let a = [0, 1, 2, 3, 4, 5]
        let d = [0, 1, 2, 3, 4, 5]
        let b = 0
        let c = 0
        seq = seq.map(s => this.tokens[s])
        for (let k = 0; k < seq.length; k++) {
            let nk = k + 1
            let revk = seq.length - nk
            for (let j = 0; j < seq[k].length; j++) {
                b = (seq[k][j] + b) % 1024
                a[j] = (seq[k][j] + a[j]) % 1024
                c = (seq[revk][j] + c) % 1024
                d[j] = (seq[revk][j] + d[j]) % 1024
                seq[k][j] = (a[j] + d[j]) % 1024
            }
        }
        return seq
    }
    search(tokens) {


    }
    get(seq) {


        let res = this.preprocess(seq)
        res = this.indexs(res)

    }
    set(seq, val) {
        seq = this.preprocess(seq)
        val = val
       this._set(seq,val)

        }
    }
    let t = new Tree()
    //t.genFile()
 