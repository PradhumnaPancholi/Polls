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
    // 3. Test for basic  voting mechanism//
    it('Verifies that the vote is added', () => {
        return Poll.deployed().then((instance) => {
            pollInstance = instance
            contestantId = 1
            return pollInstance.castVote(contestantId)
        }).then((receipt) => {
            return pollInstance.contestants(contestantId)
        }).then((contestant) => {
            votes = contestant[3]
            //this test logic isn't dynamic - means written to run against empty blockchain//
            assert.equal(votes, 1, 'Added vote for the contestant')
        })
            
    })
    // 4. test for checking if user was added to votersList//
    it('Verifies that user was added to votersList with true value', () => {
        return Poll.deployed().then((instance) => {
            pollInstance = instance
            constestantId = 1
            return pollInstance.castVote(1, {from: accounts[0]})
        }).then((receipt) => {
            return pollInstance.votersList(accounts[0])
        }).then((voted) => {
            assert(voted, 'The voter was added to votersList')
        })
    }) 
})
