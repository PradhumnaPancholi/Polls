const Poll  = artifacts.require('./Poll')

//testing the smart contracts//

// 1. Test to verify number of contestants//
contract('Poll', (accounts) => {
    it('Initialize & Get Number of Contestant', () => {
        //check if the contract id deployed//
        return Poll.deployed().then((instance) => {
            //get numbers of contestants//
            return instance.contestantsCount()
        }).then((count) => {
            //test with assertion//
            assert.equal(count, 2)
        })
    })
})