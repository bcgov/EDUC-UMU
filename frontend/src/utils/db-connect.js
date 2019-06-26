import Telnet from 'telnet-client'

async function run() {
    let connection = new Telnet()
   
    let params = {
      host: '',
      port: 11,
      shellPrompt: '/ # ',
      timeout: 1500
    }
   
    try {
      await connection.connect(params)
    } catch(error) {
      // handle the throw (timeout)
    }
   
    let res = await connection.exec('uptime')
    console.log('async result:', res)
  }
   
  run()