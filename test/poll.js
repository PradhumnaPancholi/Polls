const Poll  = artifacts.require('./Poll')

//testing the smart contracts//

contract('Poll', (accounts) => {
    // 1. Test to verify number of contestants//
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
    // 2. Test to verify the contestant data stored in block//
    it('Verifies if the contestants data in the blockchain', () => {
        return Poll.deployed().then((instance) => {
            pollInstance = instance
            return pollInstance.contestants(1)
        }).then((contestant) => {
            assert.equal(contestant[0], 1, 'Id is correct')
            assert.equal(contestant[1], 'FRIENDS', 'Name is correct')
            assert.equal(contestant[2], 'Comedy', 'Genre is correct')
            //return next contestant
            return pollInstance.contestants(2)
            //verify data
        }).then((contestant) => {
            assert.equal(contestant[0], 2, 'Id is correct')
            assert.equal(contestant[1], 'HIMYM', 'Name is correct')
            assert.equal(contestant[2], 'Comedy', 'Genre is correct')
        })
    })
})
