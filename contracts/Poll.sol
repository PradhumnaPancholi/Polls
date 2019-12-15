pragma solidity >=0.4.0 <0.6.0;

contract Poll{
    //model class for contestant//
    struct Contestant {
        uint id;
        string name;
        string genre;
        uint votes;
    }

    //mapping to fetch contestant details//
    mapping(uint => Contestant) public contestants;

    //list to hold a list of voters//
    mapping(address => bool) public votersList;

    //varialble to keep track of number of contestants - because of the way solidity work//
    uint public contestantsCount;

    //contructor for a Poll with contestants//
    constructor () public {
        addNewContestant('FRIENDS', 'Comedy');
        addNewContestant('HIMYM', 'Comedy');
    }

    //function to add a contestant//
    function addNewContestant (string memory _name, string memory _genre) private {
        //increament the value of contestantCount//
        contestantsCount  ++;
        contestants[contestantsCount] = Contestant(contestantsCount, _name, _genre, 0);
    }

    //function to cast vote to a contestant and follow up with voetrs data//
    function castVote(uint _contestantId) public {
    // filter to block single user for multiple times //
        //user is not present in votersList
        require(!votersList[msg.sender], 'User has already voted');
        //check id it's a valid contestant//
        require(_contestantId > 0 && _contestantId <= contestantsCount, 'Not a valid contestant');
        //add vote count for the contestant//
        contestants[_contestantId].votes ++;
        //adding user to votersList//
        votersList[msg.sender] = true;
    }
}