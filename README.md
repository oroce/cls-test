### CLS test

     curl localhost:8000

     {"took":[0,19183368],"dummy":true,"cmd":"cmd was: GET dummy"}


Meanwhile the app outputs:

     { 
        tid: 'ed6c1012-d73c-427f-97a2-9a26e7efbe17',
        log: [{ 
          took: [ 0, 19183368 ],
          cmd: 'cmd was: GET dummy',
          transactionId: 'ed6c1012-d73c-427f-97a2-9a26e7efbe17' 
        }]
      }
