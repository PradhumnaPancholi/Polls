App = {
  web3Provider: null,
  contracts: {},
  account: 0x0,

  init: async () => {

    return await App.initWeb3();
  },

  //this func manages web3 provider//
  initWeb3: async () => {
    
    if(typeof web3 === 'undefined') {
      //initiate and set web3 provider//
      App.web3Provider = web3.currentProvider
      const web3 = new Web3(web3.currentProvider)
    }else{
      //if no provider available, connect with local network//
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
      web3 = new Web3(App.web3Provider)
    }

    return App.initContract();
  },

  //this func intiates and connects with the smart contracts living on the blockchain network//
  initContract: () => {
    $.getJSON('Poll.json',(poll) => {
      App.contracts.Poll = TruffleContract(poll)
      App.contracts.Poll.setProvider(App.web3Provider)
      return App.renderData();
    })

    // return App.renderData();
  },

  //this func renders data to display for client side//
  renderData: () => {
    let pollInstance
    let loader = $('#loader')
    let content = $('.content')

    //while data is being fetched//
    loader.show()
    content.hide()

    //fetch account data via wallet //
    web3.eth.getCoinbase((err, account) => {
      if(err == null){
        App.account = account
        console.log(`Your account: ${account}`)
      }else{
        console.warn(err)
      }
    })

    //load contract data on client browwser

    // 1. create a poll instance once it's deployed
    App.contracts.Poll.deployed().then((instance) => {
      pollInstance = instance
    // 2. get number of contestants
      return pollInstance.contestantsCount()
    }).then((contestantsCount) => {
    // 3. get table-data result element and dump all the data in it.
        let contestantsData = $('.table-data')
        contestantsData.empty()
        // 3a. get the select e4lement and dump all the data in it.
        let contestantSelect = $('.select-control')
        contestantSelect.empty()

    //4. Run a loop on data from contracts //
        for(i=1; i<=contestantsCount; i++){
          pollInstance.contestants(i).then((contestant) => {
            //prepare data//
            let id = contestant[0]
            let name = contestant[1]
            let genre = contestant[2]
            let votes = contestant[3]

    //5. Create templelate for table row and append data//
            let contestantDataTemplate = '<tr><th>' + id + '</th><td>' + name + '</td><td>' + genre + '</td><td>' + votes + '</td></tr>'
            contestantsData.append(contestantDataTemplate)

            // 5a. create a template for options in select to render//
            let contestantSelectOption = '<option value=" '+ id +' " ' + '>' + name +'</option>'
            contestantSelect.append(contestantSelectOption)
          })
        }

        //hide loader and display table data//
        loader.hide()
        content.show()

    //just a basic catch for errors//
    }).catch((err) => {
      console.warn(err)
    })
  }
  

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
