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

    //varialble to keep track of number of contestants - because of the way solidity work//
    uint public contestantCount;

    //function to add a contestant//
    function addNewContestant (string memory _name, string memory _genre) private {
        //increament the value of contestantCount//
        contestantCount  ++;
        contestants[contestantCount] = Contestant(contestantCount, _name, _genre, 0);
    }
}