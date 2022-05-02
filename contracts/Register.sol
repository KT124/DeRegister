//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.0;


// Import Ownable from the OpenZeppelin Contracts library
// import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

 

contract RegisterFactory {
    Register[] public registers;

    function createRegister(address creator) public {
        Register register = new Register(creator);
        registers.push(register);
    }
}

contract Register  {

    using SafeMath for uint256;
    
    Person[] public persons;
    Locale[] public locales;
    address public owner;
    mapping(address => uint256) public addressToID;
    mapping(address => string) public addrToName;
    mapping(uint256 => string) internal idToName;
    mapping(address => Locale) public addrToLocale;
    mapping(address => Person) public addrtoPerson;

    struct Person {
        string citizen;
        string fullName;
        string addr;
        string IDtype;
        uint256 IDnum;
        uint256 registerID;
    }

    struct Locale {

        uint256 lat;
        uint256 lng;
    }

    constructor(address creator) {
        owner = creator;
    }

    function register(
        string memory citizen_,
        string memory fullName_,
        string memory addr_,
        string memory IDtype_,
        uint256 IDnum_
    ) public {
        require(bytes(citizen_).length != 0 && bytes(fullName_).length != 0 && bytes(addr_).length != 0
        && bytes(IDtype_).length != 0 && IDnum_ != 0, "user input required");
        uint256 registerID;
        registerID++;

        persons.push(
            Person(citizen_, fullName_, addr_, IDtype_, IDnum_, registerID)
        );
        addrToName[msg.sender] = fullName_;
        addressToID[msg.sender] = registerID;
        idToName[registerID] = fullName_;

    
    }

    function propOwner(uint registerID) public view returns(string memory) {
        string memory name = idToName[registerID];
        return name;
    }

    function setLocale(uint256 lat_, uint256 lng_) public {
        // Locale memory locale;
        // locale.lat = lat;
        // locale.lng = lng;
        // locales.push(locale);
        addrToLocale[owner] = Locale(lat_, lng_);
        locales.push(Locale(lat_, lng_));
        

    }

     
}
