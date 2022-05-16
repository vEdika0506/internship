import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from "@material-ui/icons/Cancel";
import { useAlert } from "react-alert";
import Footer from "./Footer";
// import 'react-tabs/style/react-tabs.css';
import "./7Content.css";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Logo from "../Banner/logo.png";
import axios from "axios";
import FadeIn from "react-fade-in";
import DatePicker from "react-date-picker";
import header from "./header.png";
import header1 from "./header1.png";
import header2 from "./header2.png";
// Create styles

function Content() {
  // added new date object which help in rendering date in correct format
  const current = new Date();
  const date = `${current.getDate()}-${
    current.getMonth() + 1
  }-${current.getFullYear()}`;
  const [tabIndex, setTabIndex] = useState(0);
  const alert = useAlert();
  const [name, setName] = useState("");
  const [sal, setSal] = useState("Mr");
  const [dob, setDob] = useState(new Date());
  const [spouse, setSpouse] = useState("");
  const [yom, setYom] = useState("");
  const [haveChilderen, setHaveChilderen] = useState("No");
  const [noOfChilderen, setNoOfChilderen] = useState(1);
  const [childeren, setChilderen] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState("");
  const [occupation, setOccupation] = useState("Salaried");
  const [religion, setReligion] = useState("Hindu");
  const [present1, setpresent1] = useState("");
  const [present2, setpresent2] = useState("");
  const [presentCity, setpresentCity] = useState("");
  const [presentState, setPresentState] = useState("");
  const [presentCountry, setPresentCountry] = useState("India");
  const [presentPin, setPresentPin] = useState("");
  const [executors, setExecutors] = useState([
    { sal: "Mr", name: "", relation: "" },
  ]);
  const [visited, setVisited] = useState([false,false,false,false])
  useEffect(() => {
    const tempPersonal = JSON.parse(localStorage.getItem("personalDetails"));
    if (tempPersonal) {
      setSal(tempPersonal["sal"]);
      setName(tempPersonal["name"]);
      setDob(tempPersonal["dob"]);
      setOccupation(tempPersonal["occupation"]);
      setReligion(tempPersonal["religion"]);
      setExecutors(tempPersonal["executors"]);
      setSpouse(tempPersonal["spouse"]);
      setMaritalStatus(tempPersonal["maritalStatus"]);
      setHaveChilderen(tempPersonal["haveChilderen"]);
      setNoOfChilderen(tempPersonal["noOfChilderen"]);
      setChilderen(tempPersonal["childeren"]);
    }
    const tempAddress = JSON.parse(localStorage.getItem("address"));
    if (tempAddress) {
      setpresent1(tempAddress["present1"]);
      setpresent2(tempAddress["present2"]);
      setpresentCity(tempAddress["presentCity"]);
      setPresentState(tempAddress["presentState"]);
      setPresentPin(tempAddress["presentPin"]);
      setPresentCountry(tempAddress["presentCountry"]);
    }
  }, []);
  function initializeChildren(e) {
    var number = e.target.value;
    
    if (number > 3) {
      alert.show("Maximum Allowed Children are 3");
      number = 3;
    }
    setNoOfChilderen(number);
    const temp = [];
    for (var i = 0; i < number; i++) {
      temp.push({ index: i, childName: "", childAge: "" });
    }
    setChilderen(temp);
  }
  function initializeChildren1(n) {

    const temp = [];
    
    temp.push({ index: 0, childName: "", childAge: "" });
    
    setChilderen(temp);
  }

  const [childnameerr, setChildnameerr] = useState(["", "", ""]);
  function setChildName(e, index) {
    const tempchild = childeren.splice(0);
    tempchild[index]["childName"] = e.target.value;
    if (!tempchild[index]["childName"].match(/^[a-zA-Z]+ [a-zA-Z]+$/)) {
      childnameerr[index] = "Please Enter Full Name for child eg. Ankit Verma";
      setChildnameerr(childnameerr);
    } else {
      childnameerr[index] = "";
      setChildnameerr(childnameerr);
    }
    //console.log('child',tempchild)
    setChilderen(tempchild);
  }
  const [childageerr, setChildageerr] = useState(["", "", ""]);
  function setChildAge(e, index) {
    e.preventDefault()
    if (e.target.value.length>2){
      return
    }
    const tempchild = childeren.splice(0);
    tempchild[index]["childAge"] = e.target.value;
    // console.log(
    //   "check",
    //   typeof tempchild[index]["childAge"],
    //   tempchild[index]["childAge"],
    //   tempchild[index]["childAge"].match(/^\d*$/)
    // );
    if (!tempchild[index]["childAge"].match(/^\d*$/)) {
      childageerr[index] = "Enter Valid Child age";
      setChildageerr(childageerr);
    } else if (
      parseInt(tempchild[index]["childAge"]) >= parseInt(getAge(dob))
    ) {
      childageerr[index] = "Enter Valid Child age";
      setChildageerr(childageerr);
    } else {
      childageerr[index] = "";
      setChildageerr(childageerr);
    }
    setChilderen(tempchild);
  }
  function remChild(e, index) {
    const tempChild = childeren.splice(0);
    tempChild.splice(index, 1);
    const temp = noOfChilderen - 1;
    setNoOfChilderen(temp);
    setChilderen(tempChild);
    if (temp === 0) {
      setHaveChilderen(false);
    }
  }
  function setExecSal(e, index) {
    const tempchild = executors.splice(0);
    tempchild[index]["sal"] = e.target.value;
    setExecutors(tempchild);
  }
  function setExecName(e, index) {
    const tempchild = executors.splice(0);
    tempchild[index]["name"] = e.target.value;
    setExecutors(tempchild);
  }
  function setExecRelation(e, index) {
    const tempchild = executors.splice(0);
    tempchild[index]["relation"] = e.target.value;
    setExecutors(tempchild);
  }
  function submitPersonal(e) {
    e.preventDefault();
    if (otherRel !== "") {
      setReligion(otherRel);
    }
    //console.log(valid);
    if (!valid) {
      alert.show("enter valid year of marriage");
      return;
    }
    if (maritalStatus === "Single") {
      setHaveChilderen("No");
      setYomerr('');
      //console.log('oop', haveChilderen,noOfChilderen,childeren)
    }
    if (
      (maritalStatus === "Married" && spouse && yom) ||
      maritalStatus !== "Married"
    ) {
      if (haveChilderen) {
        for (let i = 0; i < childeren.length; i++) {
          if (childeren[i].childName === "" || childeren[i].childAge === "") {
            alert.show("Please Fill all the child details");
            return;
          }
        }
      }
      if (
        sal &&
        name &&
        dob &&
        occupation &&
        religion &&
        maritalStatus &&
        executors
      ) {
        const personalDetails = {
          sal: sal,
          name: name,
          dob: new Date(dob),
          occupation: occupation,
          religion: religion,
          executors: executors,
          spouse: spouse,
          maritalStatus: maritalStatus,
          yom: yom,
          haveChilderen: haveChilderen,
          noOfChilderen: noOfChilderen,
          childeren: childeren,
        };

        if (getAge(dob) < 18) {
          alert.show("You need to be at least 18 years old to make will");
          setDob(new Date());
          return;
        }
        // console.log('c')
        // if (childeren !== []){
        //     for(var i=0; i<=childeren.length; i ++){
        //         if(childeren[i].childName.length ===0 || childeren[i].childAge.length ===0){
        //             alert.show('Please Complete the Children/s details')
        //             return
        //         }
        //     }
        // }
        if (
          present1 &&
          presentCity &&
          presentState &&
          presentPin &&
          presentCountry
        ) {
          const address = {
            present1: present1,
            present2: present2,
            presentCity: presentCity,
            presentState: presentState,
            presentPin: presentPin,
            presentCountry: presentCountry,
          };
          localStorage.setItem("address", JSON.stringify(address));
        } else {
          alert.show("All fields in Present Address are required");
          return;
        }
        localStorage.setItem(
          "personalDetails",
          JSON.stringify(personalDetails)
        );
        let v = visited;
        v[0]= true
        let f = flip;
        f[0]= true
        setVisited(v)
        setTabIndex(1);
      } else {
        alert.show("All personal information fields are required");
      }
    } else if (yom.length === 0) {
      alert.show("Please Enter Year of Marriage");
      return;
    } else {
      alert.show("Please enter spouse name!");
    }
  }
  function addExecutor(e) {
    e.preventDefault();
    const tempExec = executors.splice(0);
    tempExec.push({ sal: "Mr", name: "", relation: "" });
    setExecutors(tempExec);
  }
  function removeExecutor(e) {
    e.preventDefault();
    const tempExec = executors.splice(0);
    tempExec.pop();
    setExecutors(tempExec);
  }

  //Beneficiary details State variables
  const [benName, setBenName] = useState("");
  const [benSal, setBenSal] = useState("Mr");
  const [benDOB, setBenDOB] = useState();
  const [benRelation, setBenRelation] = useState('Wife');
  const [guardianSal, setGuardianSal] = useState("Mr");
  const [guardianName, setGuardianName] = useState("");
  const [guardianList, setGuardianList] = useState([]);
  const [guardianDOB, setGuardianDOB] = useState("");
  const [guardianRelation, setGuardianRelation] = useState("Mother");
  const [beneficiary, setBeneficiary] = useState([]);
  const [beneficiaries, setbeneficiaries] = useState([]);
  const [benState, setbenState] = useState("");

  function addBeneficiary(e) {
    e.preventDefault();
    //console.log("err", bennamer, benrelerr);
    if (bennamer.length > 2) {
      alert.show("Please Fill Valid Details");
    }
    if(benName.length === 0 || !benDOB){
      alert.show('Please Fill in all Details')
    }
    if (benSal && benName.length >1 && benDOB && benRelation) {
      beneficiary.push(benSal);
      setBenSal("Mr");
      beneficiary.push(benName);
      setBenName("");
      beneficiary.push(benDOB);
      setBenDOB("");
      beneficiary.push(benRelation);
      setBenRelation("");
      if (
        getAge(benDOB) < 18 &&
        guardianSal &&
        guardianName &&
        guardianDOB &&
        guardianRelation
      ) {
        if (guardianName && guardianRelation) {
          if (getAge(guardianDOB) >= 18) {
            beneficiary.push(guardianSal);
            beneficiary.push(guardianName);
            beneficiary.push(guardianDOB);
            beneficiary.push(guardianRelation);
            setGuardianDOB(guardianDOB);
            setGuardianName(guardianName);
            setGuardianRelation(guardianRelation);
            setGuardianSal(guardianSal);

            var temp = guardianList;
            temp.push = [guardianSal, guardianName, guardianRelation];
            setGuardianList(temp);
          } else {
            alert.show("Guardian cannot be a minor!");
            return;
          }
        } else {
          //alert.show('Fill in all Details')
          return;
        }
      }
      beneficiaries.push(beneficiary);
      setBeneficiary([]);
      //console.log(beneficiaries);
      localStorage.setItem("beneficiaries", JSON.stringify(beneficiaries));
      alert.show("Beneficiary Added Succesfully");
    } 
  }
  useEffect(() => {
    const localbenef = JSON.parse(localStorage.getItem("beneficiaries"));
    //console.log(localbenef);
    if (localbenef) {
      setbeneficiaries(localbenef);
    }
  }, [benState]);
  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  function removeBeneficiary(index) {
    const temp = beneficiaries[index];
    setBenSal(temp[0]);
    setBenName(temp[1]);
    setBenDOB(temp[2]);
    setBenRelation(temp[3]);
    if (temp.length > 4) {
      setGuardianSal(temp[4]);
      setGuardianName(temp[5]);
      setGuardianDOB(temp[6]);
      setGuardianRelation(temp[7]);
    }
    const tempben = beneficiaries;
    tempben.splice(index, 1);
    //console.log(tempben);
    setbeneficiaries([]);
    setbeneficiaries(tempben.length !== 0 ? tempben : []);
    localStorage.setItem("beneficiaries", JSON.stringify(beneficiaries));
    setImmovableAssets([]);
    setMovableAssets([]);
    localStorage.removeItem("immovableAssets");
    localStorage.removeItem("movableAssets");
    setbenState("updated");
    alert.show("Beneficiary Removed Succesfully");
  }
  //assets State variables
  const [assetType, setAssetType] = useState("Bank Account");
  const [assetType1, setAssetType1] = useState("Flat");
  const [share, setShare] = useState([0]);
  const [area, setArea] = useState("");
  const [assetAreaUnit, setAssetAreaUnit] = useState("");
  const [ownership, setOwnership] = useState("");
  const [description, setDescription] = useState("");
  const [assetAddress1, setAssetAddress1] = useState("");
  const [assetAddress2, setAssetAddress2] = useState("");
  const [assetCity, setAssetCity] = useState("");
  const [assetState, setAssetState] = useState("");
  const [assetPin, setAssetPin] = useState("");
  const [assetCountry, setAssetCountry] = useState("India");
  const [bankName, setBankName] = useState("");
  const [bankNumber, setBankNumber] = useState("");
  const [bankBranch, setBankBranch] = useState("");
  const [bankLocker, setBankLocker] = useState("");
  const [assetName, setAssetName] = useState("");
  const [policyName, setPolicyName] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [immovableAssets, setImmovableAssets] = useState([]);
  const [movableAssets, setMovableAssets] = useState([]);
  const [movVisible, setMovVisible] = useState("none");
  const [immovVisible, setImmovVisible] = useState("none");
  function initializeShare() {
    const tempShare = [];
    if (beneficiaries.length === 0) {
      alert.show("Please add beneficiary");
      return
    } else {
      beneficiaries.map((ben, index) => {
        tempShare.push({ index: index, name: ben[1], dob: ben[2], value: 0 });
      });
      let v = visited
      v[1] = true
      let f = flip 
      f[1] = true
      setFlip(f)
      setVisited(v)
      setTabIndex(2);
      setShare(tempShare);
    }
  }
  function handleShareChange(e, name, dob, index) {
    const tempshare = share.slice(0);
    //console.log(index);
    if (tempshare.find((o) => o.name === name)) {
      //console.log(index);
      tempshare[index] = {
        index: index,
        name: name,
        dob: dob,
        value: e.target.value,
      };
      setShare(tempshare);
    } else {
     // console.log(index);
      tempshare.push({
        index: index,
        name: name,
        dob: dob,
        value: e.target.value,
      });
      setShare(tempshare);
    }
    var totalShare = 0;
    share.map((temp) => {
      totalShare = totalShare + Number(temp["value"]);
    });
    if (totalShare === 100) {
      localStorage.setItem("residuary", JSON.stringify(share));
      
      setTabIndex(2);
    }
    // else {
    //     if (totalShare < 100)
    //         alert.show('Assign 100% of the residuary properties')
    //     else
    //         alert.show("More Than 100% Residuary Property Assigned")
    // }
  }
  // useEffect(() => {
  //     async function fetchapi(){
  //   const result = await axios(
  //     'https://api.postalpincode.in/pincode/440027',
  //   );

  //   console.log('ppppp',result.data[0].PostOffice[0].Region)
  // } fetchapi()},[]);

  useEffect(() => {
    const localImmovableAssets = JSON.parse(
      localStorage.getItem("immovableAssets")
    );
    const localMovableAssets = JSON.parse(
      localStorage.getItem("movableAssets")
    );
    //console.log(localImmovableAssets);
    if (localImmovableAssets) {
      setImmovableAssets(localImmovableAssets);
    }
    if (localMovableAssets) {
      setMovableAssets(localMovableAssets);
    }
  }, [benState]);
  function addImmovableAsset(e) {
    var totalShare = 0;
    share.map((temp) => {
      totalShare = totalShare + Number(temp["value"]);
    });

    if (totalShare === 100) {
      if(!(area.length >0 && assetAddress1.length >0 && assetCity.length>0 && assetState.length>0 && assetPin.length>0)){
        alert.show('Please fill in all required details')
        return
      }
      e.preventDefault();
      const tempAsset = {
        assetType: assetType1,
        area: area,
        assetAreaUnit: assetAreaUnit,
        ownership: ownership,
        assetAddress1: assetAddress1,
        assetAddress2: assetAddress2,
        assetCity: assetCity,
        assetState: assetState,
        assetPin: assetPin,
        assetCountry: assetCountry,
        description:
          ownership +
          ",\n" +
          "Area: " +
          area +
          " " +
          assetAreaUnit +
          "\n\nAddress:\n" +
          assetAddress1 +
          ", " +
          assetAddress2 +
          ", " +
          assetCity +
          ", " +
          assetState +
          ", " +
          assetPin,
        share: share,
      };

      immovableAssets.push(tempAsset);
      setAssetType1("Flat");
      setAssetAreaUnit("");
      setArea("");
      setOwnership("");
      setDescription("");
      setAssetAddress1("");
      setAssetAddress2("");
      setAssetCity("");
      setAssetState("");
      setAssetPin("");
      setAssetCountry("Indiaf");
      setShare([]);
      //console.log(immovableAssets);
      localStorage.setItem("immovableAssets", JSON.stringify(immovableAssets));
      alert.show("Asset Added Succesfully");
    } else {
      if (totalShare < 100)
        alert.show("Please allocate total 100% to the property");
      else
        alert.show(
          "You have over allocated property: Share % total for one asset should be 100%"
        );
    }
  }
  function addAsset(e) {
    e.preventDefault();
    var totalShare = 0;
    share.map((temp) => {
      totalShare = totalShare + Number(temp["value"]);
    });
    if (totalShare === 100) {
      if (
        assetType === "Mutual Funds" ||
        assetType === "Jewellery" ||
        assetType === "Any other Investments" ||
        assetType === "Electronics and Appliances" ||
        assetType === "Digital Asset" ||
        assetType === "Business Asset"
      ) {
        if(!(assetType.length >0 &&  description.length>2)){
          alert.show("Please fill in description of your asset")
          return
        }
        const tempAsset = {
          assetType: assetType,
          description: description,
          share: share,
        };
        movableAssets.push(tempAsset);
        setAssetType("Flat");
        setDescription("");
        setShare([]);
        //console.log(movableAssets);
        localStorage.setItem("movableAssets", JSON.stringify(movableAssets));
      } else if (
        assetType === "Insurance Policies" ||
        assetType === "Bond Debentures"
      ) {
        if(!(assetName.length >0 && policyName.length >0 )){
          alert.show("Please fill in all the details")
          return
        }
        const tempAsset = {
          assetType: assetType,
          assetName: assetName,
          policyName: policyName,
          policyNumber: policyNumber,
          description: assetName + " " + policyNumber,
          share: share,
        };
        movableAssets.push(tempAsset);
        setAssetType("Flat");
        setDescription("");
        setShare([]);
        //console.log(movableAssets);
        localStorage.setItem("movableAssets", JSON.stringify(movableAssets));
      } else if (assetType === "Vehicles") {
        if(!(brand.length >0 && model.length >0 && vehicleNumber.length>2)){
          alert.show("Please fill in all the details")
          return
        }
        const tempAsset = {
          assetType: assetType,
          brand: brand,
          model: model,
          vehicleNumber: vehicleNumber,
          description: brand + " " + model,
          share: share,
        };
        movableAssets.push(tempAsset);
        setAssetType("Flat");
        setDescription("");
        setShare([]);
        //console.log(movableAssets);
        localStorage.setItem("movableAssets", JSON.stringify(movableAssets));
      } else {
        if(!(bankBranch.length >0 && bankName.length >0 && bankNumber.length>2)){
          alert.show("Please fill in all the details")
          return
        }
        const tempAsset = {
          assetType: assetType,
          bankNumber: bankNumber,
          bankBranch: bankBranch,
          bankName: bankName,
          bankLocker: bankLocker,
          description: bankName + " " + bankNumber,
          share: share,
        };
        movableAssets.push(tempAsset);
        setAssetType("Flat");
        setDescription("");
        setShare([]);
        //console.log(movableAssets);
        localStorage.setItem("movableAssets", JSON.stringify(movableAssets));
      }
      alert.show("Asset Added Succesfully");
    } else {
      if (totalShare < 100)
        alert.show("Please allocate total 100% to the property");
      else
        alert.show(
          "You have over allocated property: Share % total for one asset should be 100%"
        );
    }
  }
  function removeImmovable(index) {
    const tempAsset = immovableAssets[index];
    setAssetType1(tempAsset["assetType"]);
    setArea(tempAsset["area"]);
    setOwnership(tempAsset["ownership"]);
    setDescription(tempAsset["description"]);
    setAssetAddress1(tempAsset["assetAddress1"]);
    setAssetAddress2(tempAsset["assetAddress2"]);
    setAssetCity(tempAsset["assetCity"]);
    setAssetState(tempAsset["assetState"]);
    setAssetPin(tempAsset["assetPin"]);
    setAssetCountry(tempAsset["assetCountry"]);
    setShare(tempAsset["share"]);
    const tempAssets = immovableAssets;
    tempAssets.splice(index, 1);
    setImmovableAssets([]);
    setImmovableAssets(tempAssets.length !== 0 ? tempAssets : []);
    localStorage.setItem("immovableAssets", JSON.stringify(immovableAssets));
    setbenState("update");
  }
  function removeMovable(index) {
    const tempAsset = movableAssets[index];
    setAssetType("");
    setAssetType(tempAsset["assetType"]);
    //console.log(tempAsset["assetType"]);
    //console.log(assetType);
    setDescription(tempAsset["description"]);
    setShare(tempAsset["share"]);

    const tempAssets = movableAssets;
    tempAssets.splice(index, 1);
    setMovableAssets([]);
    setMovableAssets(tempAssets.length !== 0 ? tempAssets : []);
    localStorage.setItem("movableAssets", JSON.stringify(movableAssets));
    setbenState("update");
  }
  const [alternate, setAlternate] = useState([]);
  function initializeAlternate() {
    var tempAlt = [];

    immovableAssets?.map((asset, index) => {
      tempAlt.push({
        assesType: asset["assetType"],
        details: asset["description"],
        altDetails: "",
      });
    });
    movableAssets?.map((asset, index) => {
      tempAlt.push({
        assesType: asset["assetType"],
        details: asset["description"],
        altDetails: "",
      });
    });
    setAlternate(tempAlt);
    checkValid();
  }
  function checkValid() {
    // var totalShare = 0;
    // share.map((temp) => {
    //     totalShare = totalShare + Number(temp['value']);
    // })
    // if (totalShare === 100) {
    //     setResiduary(share);
    //     localStorage.setItem('residuary', JSON.stringify(share));
    //     setTabIndex1(1)
    // }
    // if(allownext){
    //     setTabIndex1(1);
    // }
    // else {

    //     if (totalShare < 100)
    //         alert.show('Please allocate total 100% to the property')
    //     else
    //         alert.show("You have over allocated property: Share % total for one asset should be 100%")
    // }
    if (immovableAssets.length === 0 && movableAssets.length === 0) {
      alert.show("Please Fill in Asset Details");
    } else {
      setTabIndex1(1);
    }
  }
  function storeAlternate() {
    var filled = true;
    // alternate?.map((alt) => {
    //     if (!alt['altDetails']) {
    //         alert.show("Please fill all alternate beneficiaries")
    //         filled = false;
    //         return
    //     }
    // })
    if (filled) {
      localStorage.setItem("alternate", JSON.stringify(alternate));
      setTabIndex1(2);
    }
  }

  const handleExportWithComponent = (event) => {
    // PDF Downloading Code

    //console.log('temp2', temp2)
    //console.log('temp1', temp1)
    //{ text: '8. I wish to appoint _______ as a guardian for the minor/minors who are the beneficiaries in the Will, till the time they turn major.', style: 'subheader' }
    // {
    //     text: `3. I got married to my spouse ${spouse} in the year ${yom}.I have ${noOfChilderen} children. The name/s of my children are as under:.`,
    //     style: "subheader",
    //   }
    // {
    //     style: "tableExample",

    //     table: {
    //       widths: ["*", "*"],
    //       body: child,
    //     },
    //   }

    //console.log('gn',share)
    let cls3 = {};
    let chl = {};
    const alt = [
      [
        { text: "Sr. No.", style: "tableHeader" },
        { text: "Name of Asset", style: "tableHeader" },
        { text: "Description Asset and Address", style: "tableHeader" },
        {
          text: "Beneficiaries & percentage to beneficiary",
          style: "tableHeader",
        },
      ],
    ];
    //console.log('res',residuary)
    for (let i = 0; i < alternate.length; i++) {
      if (alternate[i].altDetails !== "") {
        alt.push([
          { text: i + 1 },
          { text: alternate[i].assesType },
          { text: alternate[i].details },
          { text: alternate[i].altDetails },
        ]);
      }
    }
    let id = 7;
    let cls6 = {};
    let cls62 = {};
    for (let i = 0; i < alternate.length; i++) {
      if (alternate[i].altDetails !== "") {
        cls6 = {
          text: `${id}. It is also my wish that, in case any of the above stated beneficiaries predecease me then the share of that beneficiary under this WILL shall devolve upon:`,
          style: "subheader",
        };
        cls62 = {
          style: "tableExample",
          table: {
            body: alt,
          },
        };
        id += 1;
        break;
      }
    }
    const resididx = id;
    //console.log("altfin", id);
    let gid = resididx + 1;
    let cls8 = {};
    let g = "";
    if (guardianName.length > 0) {
      for (let i = 0; i < beneficiaries.length; i++) {
        if (beneficiaries[i].length > 4) {
          g += beneficiaries[i][5] + " and ";
        }
      }
      g = g.substring(0, g.length - 4);
      //console.log(g);
      cls8 = {
        text: `${gid}. I wish to appoint ${g} as a guardian for the minor/minors who are the beneficiaries in the Will, till the time they turn major.`,
        style: "subheader",
      };
      gid += 1;
    }
    //console.log("guardfin", gid);
    const ress = [
      [
        { text: "List of Beneficiaries", style: "tableHeader" },
        { text: "Percentage of bequeath", style: "tableHeader" },
      ],
    ];
    for (let i = 0; i < share.length; i++) {
      ress.push([
        { text: i + 1 },
        { text: share[i].name + " " + share[i].value + "%. " },
      ]);
    }

    const clsidx = gid;
    //console.log(resididx);
    if (maritalStatus === "Single") {
      cls3 = { text: "4.I am single.", style: "subheader" };
    }
    if (maritalStatus === "Widowed") {
      if (haveChilderen === "No") {
        cls3 = {
          text: "4.I am widowed. I have no children.",
          style: "subheader",
        };
      } else {
        cls3 = {
          text: `4.I am widowed. I have ${noOfChilderen} children. The name/s of my children are as under:`,
          style: "subheader",
        };
        const child = [
          [
            { text: "Name", style: "tableHeader" },
            { text: "Age (years)", style: "tableHeader" },
          ],
        ];
        for (let i = 0; i < childeren.length; i++) {
          child.push([
            { text: `${childeren[i].childName}`, style: "tableHeader" },
            { text: `${childeren[i].childAge}`, style: "tableHeader" },
          ]);
          chl = {
            style: "tableExample",
            table: { widths: ["*", "*"], body: child },
          };
        }
      }
    }
    if (maritalStatus === "Divorced") {
      if (haveChilderen === "No") {
        cls3 = {
          text: "4.I am divorced. I have no children.",
          style: "subheader",
        };
      } else {
        cls3 = {
          text: `4.I am divorced. I have ${noOfChilderen} children. The name/s of my children are as under:`,
          style: "subheader",
        };
        const child = [
          [
            { text: "Name", style: "tableHeader" },
            { text: "Age (years)", style: "tableHeader" },
          ],
        ];
        for (let i = 0; i < childeren.length; i++) {
          child.push([
            { text: `${childeren[i].childName}`, style: "tableHeader" },
            { text: `${childeren[i].childAge}`, style: "tableHeader" },
          ]);
          chl = {
            style: "tableExample",
            table: { widths: ["*", "*"], body: child },
          };
        }
      }
    }
    if (maritalStatus === "Married") {
      if (haveChilderen === "No") {
        cls3 = {
          text: `4.I got married to my spouse ${spouse} in the year ${yom}. I have no children.`,
          style: "subheader",
        };
      } else {
        cls3 = {
          text: `4.I got married to my spouse ${spouse} in the year ${yom}. I have ${noOfChilderen} children. The name/s of my children are as under:`,
          style: "subheader",
        };
        const child = [
          [
            { text: "Name", style: "tableHeader" },
            { text: "Age (years)", style: "tableHeader" },
          ],
        ];
        for (let i = 0; i < childeren.length; i++) {
          child.push([
            { text: `${childeren[i].childName}`, style: "tableHeader" },
            { text: `${childeren[i].childAge}`, style: "tableHeader" },
          ]);
          chl = {
            style: "tableExample",
            table: { widths: ["*", "*"], body: child },
          };
        }
      }
    }

    const child = [
      [
        { text: "Name", style: "tableHeader" },
        { text: "Age (years)", style: "tableHeader" },
      ],
    ];
    for (let i = 0; i < childeren.length; i++) {
      child.push([
        { text: `${childeren[i].childName}`, style: "tableHeader" },
        { text: `${childeren[i].childAge}`, style: "tableHeader" },
      ]);
    }
    // const tem = {style: "tableExample",table:{width:["*", "*"],body:child}}
    let rel = "";
    for (let i = 0; i < beneficiaries.length; i++) {
      rel += beneficiaries[i][3] + ", ";
    }
    rel = rel.substring(0, rel.length - 2);

    const immov = [
      [
        { text: "Sr. No.", style: "tableHeader" },
        { text: "Name of Asset", style: "tableHeader" },
        { text: "Description Asset and Address", style: "tableHeader" },
        {
          text: "Beneficiaries & percentage to beneficiary",
          style: "tableHeader",
        },
        { text: "Relation with the Testaor", style: "tableHeader" },
      ],
    ];
    //share":[{"index":0,"name":"jayashree","dob":"1965-08-10","value":"60"},{"index":1,"name":"shantanu","dob":"1999-05-05","value":"40"}]},
    for (let i = 0; i < immovableAssets.length; i++) {
      //const [assetType,description] = immovableAssets[i];
      let sharevalue = "";
      immovableAssets[i].share.forEach(function (sh) {
        sharevalue += sh.name + " " + sh.value + "%, ";
      });
      sharevalue = sharevalue.substring(0, sharevalue.length - 2);
      //console.log('assettype',immovableAssets[i])
      immov.push([
        { text: i + 1 },
        { text: immovableAssets[i].assetType },
        { text: immovableAssets[i].description },
        { text: sharevalue },
        { text: rel },
      ]);
    }

    const movv = [
      [
        { text: "Sr. No.", style: "tableHeader" },
        { text: "Name of Asset", style: "tableHeader" },
        { text: "Description Asset and Address", style: "tableHeader" },
        {
          text: "Beneficiaries & percentage to beneficiary",
          style: "tableHeader",
        },
        { text: "Relation with the Testaor", style: "tableHeader" },
      ],
    ];

    for (let i = 0; i < movableAssets.length; i++) {
      let sharevalue = "";
      movableAssets[i].share.forEach(function (sh) {
        sharevalue += sh.name + " " + sh.value + "%, ";
      });
      sharevalue = sharevalue.substring(0, sharevalue.length - 2);
      //console.log('assettype',immovableAssets[i])
      movv.push([
        { text: i + 1 },
        { text: movableAssets[i].assetType },
        { text: movableAssets[i].description },
        { text: sharevalue },
        { text: rel },
      ]);
    }

    let day = "";
    day = date.substring(date.length - 4, date.length);
    let mon = date.substring(date.length - 7, date.length - 5);
    switch (mon) {
      case "-1":
        day = " January, " + day;
        break;
      case "-2":
        day = " February, " + day;
        break;
      case "-3":
        day = " March, " + day;
        break;
      case "-4":
        day = " April, " + day;
        break;
      case "-5":
        day = " May, " + day;
        break;
      case "-6":
        day = " June, " + day;
        break;
      case "-7":
        day = " July, " + day;
        break;
      case "-8":
        day = " August, " + day;
        break;
      case "-9":
        day = " September, " + day;
        break;
      case "10":
        day = " October, " + day;
        break;
      case "11":
        day = " November, " + day;
        break;
      case "12":
        day = " December, " + day;
        break;
      default:
        break;
    }

    //console.log('ben', beneficiaries)
    var exec = "";
    for (let i = 0; i < executors.length; i++) {
      if (executors[i].name !== "") {
        var temp = ` ${executors[i].relation} ${executors[i].sal}. ${executors[i].name} and`;
        exec += temp;
      }
    }
    exec = exec.substring(0, exec.length - 3);

    // {
    //     pageMargins: 70,
    //   footer: {
    //     columns: [
    //       { text: 'Signature of Testator', alignment: 'left', style: 'testatorSign' },
    //       { text: 'Signature of Witness no.1', alignment: 'center' , style: 'whitness1Sign' },
    //       { text: 'Signature of Witness no.2', alignment: 'right' , style: 'whitness2Sign' }
    //     ]
    //   },
    // styles: {
    //     testatorSign: {
    //         margin: [40, 30, 0, 0],
    //     },
    //     whitness1Sign: {
    //         margin: [0, 30, 0, 0],
    //     },
    //     whitness2Sign: {
    //         margin: [0, 30, 40, 0],
    //     }
    // }

    // }

    // PDF Maker
    var dd = {
      header: [
        {
          image: header,
        },
      ],
      content: [
        {
          image: header2,
         
        },
        {
          // deleted the undefined component which was getting printed as undefined
          text: `WILL AND TESTAMENT OF ${sal} ${name.toUpperCase()} 
    EXECUTED ON ${date}`,
          style: "header",
        },
        {
          image: header1,
          style: 'botimg',
        },
        {
          style: "tableExamplet",

          table: {
            widths: ["*"],
            heights: 10,
            body: [
              
              [
                {
                  border: [true, true, true, false],
                  alignment: "center",
                  text: "LAST WILL",
                  style: "header1",
                }
              ],
              [
                {
                  border: [true, false, true, false],
                  alignment: "center",
                  text: "&",
                  style: "header1",
                }
              ],
              [
                {
                  border: [true, false, true, false],
                  alignment: "center",
                  text: "TESTAMENT",
                  style: "header1",
                }
              ],
              [
                {
                  border: [true, false, true, false],
                  alignment: "center",
                  text: "OF",
                  style: "header1",
                }
              ],
              [
                {
                  border: [true, false, true, false],
                  alignment: "center",
                  text: ` ${sal} ${name.toUpperCase()}`,
                  style: "header1",
                }
              ],
              [
                {
                  border: [true, false, true, false],
                  alignment: "center",
                  text: "EXECUTED ON",
                  style: "header1",
                }
              ],
              [
                {
                  border: [true, false, true, true],
                  alignment: "center",
                  text: `${date}`,
                  style: "header1",
                }
              ],
            ],
          },
        },
        { text: `WILL`, style: "headerm" },
        {
          text: `I, ${sal} ${name} , age ${getAge(
            dob
          )} years, ${religion} by religion, occupation ${occupation}, ${presentCountry}n Citizen , having residential address as ${present1}, ${present2}, ${presentCity} – ${presentPin}, do make this my last Will and Testament.`,
          style: "subheader",
        },
        {
          text: `1. I hereby revoke all my Wills, codicils and testamentary documents, made by me and this is my last Will.`,
          style: "subheader",
        },
        {
          text: `2. Under this Will, I appoint my ${exec} as the Executor/s of this Will and Trustees of my estate. They may act as executor/s either jointly or severally. The abovenamed executor/s shall take charge of my assets and properties after my death and procure Probate from the Competent Court to my Will having effect over all my assets and properties in India.`,
          style: "subheader",
        },
        {
          text: "3. I am possessed of and absolutely entitled to movable and immovable properties which are described in this Will hereunder. Any mistake in the description or any omission there from will not affect the dispositions hereby made and this will deed shall apply to all my properties of whatsoever nature and wherever situated and whether standing in my name alone and jointly with anybody else, if any name is first mentioned.",
          style: "subheader",
        },
        cls3,
        chl,
        {
          text: "5. My immovable assets and properties consist of following and after my death, I wish to bequeath my share in the below mentioned immovable properties to the persons mentioned in the table below:.",
          style: "subheader",
        },
        {
          style: "tableExample",
          table: {
            body: immov,
          },
        },
        {
          text: "6. My movable assets and properties consist of following and after my death, I wish to bequeath my share in the below mentioned movable properties to the persons mentioned below:",
          style: "subheader",
        },
        {
          style: "tableExample",
          table: {
            body: movv,
          },
        },
        cls6,
        cls62,
        {
          text: `${resididx}. I believe that for the aforesaid properties I do not possess any other movable or immovable properties. However in case it is found that I have missed or forgotten to mention any of the properties held by me as on date or if I acquire or become entitled to any moveable or immovable properties other than mentioned herein above at the time of my death, I bequeath all such properties to the following persons:`,
          style: "subheader",
        },
        {
          style: "tableExample",
          table: {
            widths: ["*", "*"],
            body: ress,
          },
        },
        cls8,
        {
          text: `${clsidx}. I have made this Will out of my free will and while I am in sound health and in good understanding and in witness hereof I have put my signature hereunder in the presence of witnesses on this __________ day of ${day}.`,
          style: "subheader",
        },
        {
          text: `Signed by the within named Testator  ${sal}. ${name} In our presence and we the undersigned Witnesses have, at the request of the Testator, in his presence and in the presence of each other, put our signatures as Witnesses `,
          style: "subheader",
        },
        {
          style: "tableExample",

          table: {
            widths: ["*", "*"],
            heights: 40,
            body: [
              [
                { text: "Testator Name", style: "tableHeader" },
                { text: "Signature", style: "tableHeader" },
              ],
              [{ text: ` ${sal} ${name.toUpperCase()}` }, { text: " " }],
            ],
          },
        },

        {
          style: "tableExample",

          table: {
            widths: ["*", "*"],
            heights: 40,
            body: [
              [
                { text: "WITNESS 1", style: "tableHeader" },
                { text: "WITNESS 2", style: "tableHeader" },
              ],
              [
                {
                  border: [true, false, true, false],
                  alignment: "left",
                  text: "Signature:",
                },
                {
                  border: [true, false, true, false],
                  alignment: "left",
                  text: "Signature:",
                },
              ],
              [
                {
                  border: [true, false, true, false],
                  alignment: "left",
                  text: "Name:",
                },
                {
                  border: [true, false, true, false],
                  alignment: "left",
                  text: "Name:",
                },
              ],
              [
                {
                  border: [true, false, true, false],
                  alignment: "left",
                  text: "Address:",
                },
                {
                  border: [true, false, true, false],
                  alignment: "left",
                  text: "Address:",
                },
              ],
              [
                {
                  border: [true, false, true, true],
                  alignment: "left",
                  text: "Date:",
                },
                {
                  border: [true, false, true, true],
                  alignment: "left",
                  text: "Date:",
                },
              ],
            ],
          },
        },
        { text: `DTD THIS DAY OF ${date}`, style: "header" },
        { text: `${sal}. ${name.toUpperCase()}`, style: "header" },
        { text: ".. TESTATOR", style: "header" },
        { text: "WILL", style: "header" },
        {
          text: "WILL made through WILL CREATOR by BAJAJ ALLIANZ powered by LawTarazoo",
          style: "footer",
        },
        {
          text: "For any legal queries contact on +91-9619792288 or mail on experts@lawtarazoo.com",
          style: "footer",
          pageBreak:"after"
        },
        { text: "Notes for author of the Will :", style: "tableHeader" },
        {
          text: "1. All pages of the will should be signed in full.",
          style: "subheader2",
        },
        {
          text: "2. Signatures of two witnesses are must.",
          style: "subheader",
        },
        {
          text: "3. This is applicable for self- acquired properties.",
          style: "subheader",
        },
        {
          text: "4. The will can be registered or unregistered. The advantage of registered will is that it can be proved easily in case of dispute.",
          style: "subheader",
        },
        {
          text: "5.  The Will deed can be made out on plain paper.",
          style: "subheader",
        },
        {
          text: "6. The original copy of executed Will can be kept is Safe deposit Locker or entrusted to legal heirs or with the executor.",
          style: "subheader",
        },
        {
          text: "7. Codicil means an instrument made in relation to a Will and explains, alters or adds to the dispositions and is deemed to form part of Will",
          style: "subheader",
        },
        {},
      ],
      footer: {
        columns: [
          {
            text: "Signature of Testator",
            alignment: "left",
            style: "testatorSign",
          },
          {
            text: "Signature of Witness no.1",
            alignment: "center",
            style: "whitness1Sign",
          },
          {
            text: "Signature of Witness no.2",
            alignment: "right",
            style: "whitness2Sign",
          },
        ],
        image: header,
      },
      // footer:{
      //     table: {

      //         body: [
      //              [
      //                 { text: 'Signature of Testator', alignment: 'left', style: 'testatorSign' },
      //                 { text: 'Signature of Witness no.1', alignment: 'center' , style: 'whitness1Sign' },
      //                 { text: 'Signature of Witness no.2', alignment: 'right' , style: 'whitness2Sign' },
      //                 { image: header, alignment: 'center', width: 200 },
      //               ],

      //         ]
      //     },
      //     layout: 'noBorders'
      // },

      pageMargins: 65,
      styles: {
        testatorSign: {
          margin: [80, 30, 0, 0],
        },
        whitness1Sign: {
          margin: [0, 30, 0, 0],
        },
        whitness2Sign: {
          margin: [0, 30, 40, 0],
        },
        botimg :{
          margin:[30,0,0,0],
        },
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
          alignment: "center",
        },
        headerm: {
          fontSize: 28,
          bold: true,
          underLine:true,
          margin: [0, 0, 0, 10],
          alignment: "center",
        },
        header1: {
          fontSize: 30,
          
          margin: [0, 15, 0, 15],
          alignment: "center",
        },
        subheader: {
          fontSize: 14,
          margin: [0, 10, 0, 5],
        },
        subheader1: {
          fontSize: 14,
          margin: [0, 50, 0, 5],
          pageBreak: "after",
        },
        subheader2: {
          fontSize: 14,
          margin: [0, 10, 0, 5],
          pageBreak: "before",
        },
        tableExample: {
          margin: [0, 5, 0, 15],
          alignment: "center",
        },
        tableExamplet: {
          margin: [0, 90, 0, 80],
          alignment: "center",
        },
        tableHeader: {
          bold: true,
          fontSize: 14,
          color: "black",
        },
        footer: {
          bold: true,
          fontSize: 12,
          color: "black",
          alignment: "center",
          margin: [40, 20, 40, 10],
        },
      },
      defaultStyle: {
        // alignment: 'justify'
      },
    };
    window.pdfMake.createPdf(dd).download("myWill");
  };

  function setAltBen(e, index) {
    var tempAlt = alternate.splice(0);
    tempAlt[index]["altDetails"] = e.target.value;
    setAlternate(tempAlt);
  }
  const [tabIndex1, setTabIndex1] = useState(0);
  const [err, setErr] = useState({ fullname: "", pincode: "" });

  function setResiduary1() {
    //console.log('share', share)
    var totalShare = 0;
    share.map((temp) => {
      totalShare = totalShare + Number(temp["value"]);
    });
    if (totalShare === 100) {
      localStorage.setItem("residuary", JSON.stringify(share));
      let v = visited
      let f = flip 
      f[2] = true 
      setFlip(f)
      v[2] = true
      v[3] = true
      setVisited(v)
      setTabIndex(3);
      handleExportWithComponent();
    } else {
      if (totalShare < 100)
        alert.show("Assign 100% of the residuary properties");
      else {
        //console.log(totalShare);
        alert.show("More Than 100% Residuary Property Assigned");
      }
    }
  }

  const validName = (e) => {
    e.preventDefault();
    setName(e.target.value);
    if (!name.match(/^[a-zA-Z]+ [a-zA-Z]+$/)) {
      err.fullname = " Please Enter Valid  Full Name";
      setErr(err);
    } else {
      err.fullname = "";
      setErr(err);
    }
  };

  const [execerr, setExecerr] = useState(["", "", ""]);
  function validNameExec(e, index) {
    e.preventDefault();
    const name = e.target.value;
    setExecName(e, index);
    if (!name.match(/^[a-zA-Z]+ [a-zA-Z]+$/)) {
      execerr[index] = " Please Enter Valid  Full Name";
      setExecerr([...execerr]);
    } else {
      execerr[index] = "";
      setExecerr(execerr);
    }
  }

  
  function validrelExec(e, index) {
    e.preventDefault();
    setExecRelation(e, index);
    }

  useEffect(() => {
    if (!presentPin.match(/^\d{6}$/)) {
      setPinerr(" Please Enter Valid Pin Code");
      setPinn("");
    } else {
      setPinn(presentPin);
      setPinerr("");
    }
  }, [presentPin]);

  useEffect(() => {
    if (!assetPin.match(/^\d{6}$/)) {
      setimaerr(" Please Enter Valid Pin Code");
    } else {
      setPinn(assetPin);
      setimaerr("");
    }
  }, [assetPin]);
  useEffect(() => {
    if (!guardianName.match(/^[a-zA-Z]+ [a-zA-Z]+$/)) {
      setGuardnamerr(" Enter Valid Guardian Name");
    } else {
      setGuardnamerr("");
    }
  }, [guardianName]);
  // useEffect( () => {
  //     let valid =true
  //     Object.values(childeren).forEach(
  //         (val) => {val.length > 0 && (valid = false);
  //             val.length >0 && (valid = false)}
  //     )
  //         if (!valid){
  //             setInvchild(false)
  //         }
  //         else{
  //             setInvchild(true)
  //         }
  //     }

  // ,[childeren])

  // useEffect( () => {
  //     if (Number(dob.substring(0,4)) < 1899){
  //         let s = '1900' + dob.substring(4,dob.length)
  //         setDob(s)
  //     }
  //     if (Number(dob.substring(0,4)) < 2100){
  //         let s = '2100' + dob.substring(4,dob.length)
  //         setDob(s)
  //     }
  // },[dob])

  //  useEffect(() => {
  //     const localbenef = JSON.parse(localStorage.getItem('beneficiaries'));
  //     console.log(localbenef)
  //     if (localbenef) {
  //         setbeneficiaries(localbenef);
  //     }
  // }, [benState]);

  async function GettApi(pin) {
    try {
      // axios
      //   .get(`https://api.postalpincode.in/pincode/${pin}`)
      //   .then((response) => {
      //     if( response.data.length > 1){
      //     setPresentState(response.data[0].PostOffice[0].State);
      //     setpresentCity(response.data[0].PostOffice[0].Block);} 
      //   });
      const t = {pin:pin,moduleName:"GBOWEB"}
      axios.post('https://balicuat.bajajallianz.com/GBOWebSales/users/populatePin' , t ).then(
        (response) => {
          if( response.data.state ){
          let str = response.data.state.toLowerCase()
          const str2 = str.charAt(0).toUpperCase() + str.slice(1);
          setPresentState(str2)
          //console.log(response)
          let str1 = response.data.dist.toLowerCase()
          const str3 = str1.charAt(0).toUpperCase() + str1.slice(1);
          setpresentCity(str3)
        }}
      )
    } catch (err) {
      console.log("error");
    }
  }
  // try{
  //   const result = await axios(
  //     `https://api.postalpincode.in/pincode/${pin}`,
  //   );
  //   if (pin !== ''){
  //     console.log('child',pin)
  //     const city = result.data[0].PostOffice[0].Block
  //     const state = (result.data[0].PostOffice[0].State)
  //     return {city ,state}
  //   }
  // }
  // catch(err){
  //     console.error(err);
  // };
  async function GettApi1(pins) {
    try {
      // axios
      //   .get(`https://api.postalpincode.in/pincode/${pinn}`)
      //   .then((response) => {
      //     setAssetState(response.data[0].PostOffice[0].State);
      //     setAssetCity(response.data[0].PostOffice[0].Block);
      //   });
      const t = {pin:pins,moduleName:"GBOWEB"}
      axios.post('https://balicuat.bajajallianz.com/GBOWebSales/users/populatePin' , t ).then(
        (response) => {
          if( response.data.state ){
          let str = response.data.state.toLowerCase()
          const str2 = str.charAt(0).toUpperCase() + str.slice(1);
          setAssetState(str2)
         
          let str1 = response.data.dist.toLowerCase()
          const str3 = str1.charAt(0).toUpperCase() + str1.slice(1);
          setAssetCity(str3)
        }}
      )
    } catch (err) {
      console.log("error");
    }
  }

  const [pinn, setPinn] = useState("");
  const [pinerr, setPinerr] = useState("");
  let validPin = (e) => {
    var str = e.target.value;
    
    setPresentPin(str);
    if (str.length === 6) {
      GettApi(str)
    }
    // if ( str.match(/^\d{6}$/)){
    //     setPinerr(" Please Enter Valid Pin Code")
    //     setPinn('')
    // }
    // else{
    //    setPinn(presentPin)
    //     setPinerr('')
    // }
  };
  useEffect(() => {
    if (
      maritalStatus === "Widowed" ||
      maritalStatus === "Married" ||
      maritalStatus === "Divorced"
    ) {
      if (haveChilderen === "Yes") {
        setNoOfChilderen(1);
        initializeChildren1(1)
      }
    }
    else{
      setHaveChilderen('No');
      setNoOfChilderen(0);
      setChilderen([])
    }
  }, [maritalStatus, haveChilderen]);
  useEffect(() => {
    if (presentCity.match(/\d/)) {
      setCityerr("Please Enter Valid City Name");
    } else {
      setCityerr();
    }
  }, [presentCity]);
  useEffect(() => {
    if (!assetPin.match(/^\d{6}$/)) {
      setimaerr(" Please Enter Valid Pin Code");
    } else {
      if (assetPin.length === 6) {
        GettApi1(assetPin);
      }
      setimaerr("");
    }
  }, [assetPin]);

  const [yomerr, setYomerr] = useState("");
  useEffect(() => {
    if (yomerr && yomerr.length > 1) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [yomerr]);
  const [valid, setValid] = useState(false);
  const [imaerr, setimaerr] = useState("");
  function validPin1(e) {
    e.preventDefault();
    setAssetPin(e.target.value);
  }

  useEffect(() => {
    if (!presentState.match(/^[a-zA-Z][a-zA-Z\s-]+[a-zA-Z]$/)) {
      setStateerr(" Please Enter Valid State Name");
    } else {
      setStateerr("");
    }
  }, [presentState]);
  const [cityerr, setCityerr] = useState("");
  const validCity = (e) => {
    e.preventDefault();
    setpresentCity(e.target.value);
    if (!presentCity.match(/^[a-zA-Z][a-zA-Z\s-]+[a-zA-Z]$/)) {
      setCityerr(" Please Enter Valid City Name");
    } else {
      setCityerr("");
    }
  };
  const [stateerr, setStateerr] = useState("");
  function validState(e) {
    e.preventDefault();
    setPresentState(e.target.value);
  }

  //  useEffect( () => {
  //     if(! assetPin.match(/^\d{6}$/)){
  //        set(" Please Enter Valid Pin Code");
  //        setPinn('');
  //     }
  //     else{
  //        setPinn(assetPin)
  //        set('');

  //     };
  // }, [assetPin])}

  useEffect(() => {
    if (!assetCity.match(/^[a-zA-Z][a-zA-Z\s-]+[a-zA-Z]$/)) {
      setImaCityerr(" Please Enter Valid City Name");
    } else {
      setImaCityerr("");
    }
  }, [assetCity]);

  useEffect(() => {
    if (!assetState.match(/^[a-zA-Z][a-zA-Z\s-]+[a-zA-Z]$/)) {
      setImaStateerr(" Please Enter Valid State Name");
    } else {
      setImaStateerr("");
    }
  }, [assetState]);

  const [imacityerr, setImaCityerr] = useState("");
  function validCity1(e) {
    e.preventDefault();
    setAssetCity(e.target.value);
  }
  const [imastateerr, setImaStateerr] = useState("");
  function validState1(e) {
    e.preventDefault();
    setAssetState(e.target.value);
  }

  function validYom(e) {
    e.preventDefault();
    const str = e.target.value;
    if (str.length > 4){
      
      return
    }
    setYom(str);
    const pp = dob.getFullYear();
    //console.log('re',pp)
    if (!str.match(/^\d{4}$/)) {
      setYomerr("Enter Valid Year of marraige");
    } else {
      if (parseInt(str) < parseInt(pp)) {
        setYomerr(`Year of marraige entered is ${str} while DOB is ${pp}`);
      } else if (parseInt(str) > parseInt("2021")) {
        setYomerr(`Enter Valid year of marraige`);
      } else {
        setYomerr("");
      }
    }
  }

  const [otherRel, setOtherRel] = useState("");
  const [relerr, setRelerr] = useState("");
  function reloth(e) {
    e.preventDefault();
    const str = e.target.value;
    let rel = "";
    setOtherRel(str);
    if (!str.match(/^[a-zA-Z]+$/)) {
      rel = " Invalid Religion Name";
      setRelerr(rel);
    } else {
      rel = "";
      setRelerr(rel);
    }
  }
  const [spouseerr, setSpouseerr] = useState("");
  function validspouse(e) {
    e.preventDefault();
    const str = e.target.value;
    let rel = "";

    if (!spouse.match(/^[a-zA-Z]+ [a-zA-Z]+$/)) {
      rel = "Please Enter Full Name";
      setSpouseerr(rel);
    } else {
      rel = "";
      setSpouseerr(rel);
    }
    setSpouse(str);
  }
  const [flatarea, setFlatarea] = useState("");
  useState(() => {
    //console.log('lllllasda')
    if (isNaN(area)) {
      setFlatarea("Invalid Value");
    } else {
      setFlatarea("");
    }
  }, [area]);

  function validflatarea(e) {
    e.preventDefault();
   
    setArea(e.target.value);
    if (parseInt(area) <=0  ) {
      setFlatarea("Invalid Value");
    }
    else if (!area.match(/^[0-9]*$/)){
      setFlatarea("Invalid Value");
    }
    else {
      setFlatarea("");
    }  
  }

  const [bennamer, setBennamerr] = useState("");
  function validbenName(e) {
    e.preventDefault();
    const str = e.target.value;
    
    setBenName(str);
    if (!benName.match(/^[a-zA-Z]+ [a-zA-Z]+$/)) {
      setBennamerr("Please add valid full name");
      //console.log('bad')
    } else {
      setBennamerr("");
      //console.log('good')
    };
    
  }
  // useState( () =>{
  //   if (!benName.match(/^[a-zA-Z]+ [a-zA-Z]+$/)) {
  //     setBennamerr("Please add valid full name");
  //     console.log('bad')
  //   } else {
  //     setBennamerr("");
  //     console.log('good')
  //   };
  // }, [benName])

  //const [benrelerr, setBenrelerr] = useState("");
  function validbenRelation(e) {
    e.preventDefault();
    const str = e.target.value;
    
    setBenRelation(str);
    
  }
  // useEffect( () => {
  //   if (!benRelation.match(/^[a-zA-Z]+$/)) {
     
  //     setBenrelerr("Invalid Relation");
  //   } else {
  //     setBenrelerr("");
  //   }
  // }, [benRelation])



  const [guardnameerr, setGuardnamerr] = useState("");
  function validguardName(e) {
    e.preventDefault();
    setGuardianName(e.target.value);
    if (guardianName.match(/^[a-zA-Z]+ [a-zA-Z]+$/)) {
      setGuardnamerr("Please input Full name");
    } else {
      setGuardnamerr("");
    }
  }
  //const [guardrelerr, setGuardrelerr] = useState("");
  function validguardrel(e) {
    e.preventDefault();
    setGuardianRelation(e.target.value);
    
  }
  // useEffect(() => {
  //   if (guardianRelation.match(/^[0-9]+$/)) {
  //     setGuardrelerr("Please input valid relation");
  //   } else {
  //     setGuardrelerr("");
  //   }
  // }

  // , [guardianRelation]);
  const mindate = new Date();
  mindate.setFullYear(1900);

  const [init, setInit] = useState(0);
  useEffect(() => {
    if (init === 0) {
      const temp = JSON.parse(localStorage.getItem("personalDetails"));
      if (temp) {
        temp.dob = new Date();
        localStorage.setItem("personalDetails", JSON.stringify(temp));
        setInit(1);
      }
    }
  }, [init]);
  const [flip,setFlip] = useState([true,true,true,true])
  const onTabSelect = (sender, e) => {
    console.log(sender, e, visited[e])
    if(visited[e]){
    setTabIndex(e)
    let v = flip
    
    
    for( let i=0; i <e; i++){
      v[i] = true
    }
    v[e] = false
    setFlip(v)
    } 
    // TODO: Add logic when tab is selected
  };
  
  // useEffect(() => {
  //  if (init === 0){
  //     const temp = JSON.parse(localStorage.getItem('personalDetails'))
  //     temp.dob = new Date().toDateString()
  //     localStorage.setItem('personalDetails', JSON.stringify(temp));
  //     setInit(1)
  //  }
  // }, [init])
  const [dobt , setDobt] = useState(new Date())
  useEffect( () => {
      setDob(dobt)   
      console.log(dobt)

  }

  ,[dobt])


  return (
    <div className="content">
      {/* {pinn.length ===6 && <GetApi setPresentCity ={setpresentCity} setPresentState= {setPresentState} pin ={pinn}/>} */}
      {/* <button onClick={handleExportWithComponent}> Download</button> */}
      <div className="content-sub">
        <Tabs
          selectedIndex={tabIndex}
          onSelect={(e) => onTabSelect("mainNav", e)}
        >
          <TabList>
            <Tab
              className={
                0 < tabIndex && flip[0] ? "react-tabs__tab done" : "react-tabs__tab"
              }
            >
              <div className="steps">
                <span className="tab-no">1</span>
                <span className="tab-green">
                  <i>
                    <img
                      src={require("../../static/right-tick-nav.svg").default}
                      alt="right-tick"
                    />
                  </i>
                </span>
                Personal Information
              </div>
            </Tab>
            <Tab
              className={
                1 < tabIndex && flip[1] ? "react-tabs__tab done" : "react-tabs__tab"
              }
            >
              <div className="steps">
                <span className="tab-no">2</span>
                <span className="tab-green">
                  <i>
                    <img
                      src={require("../../static/right-tick-nav.svg").default}
                      alt="right-tick"
                    />
                  </i>
                </span>
                Beneficiary
              </div>
            </Tab>
            <Tab
              className={
                2 < tabIndex && flip[2] ? "react-tabs__tab done" : "react-tabs__tab"
              }
            >
              <div className="steps">
                <span className="tab-no">3</span>
                <span className="tab-green">
                  <i>
                    <img
                      src={require("../../static/right-tick-nav.svg").default}
                      alt="right-tick"
                    />
                  </i>
                </span>
                Assets
              </div>
            </Tab>
            <Tab
              className={
                3 < tabIndex && flip[3] ? "react-tabs__tab done" : "react-tabs__tab"
              }
            >
              <div className="steps">
                <span className="tab-no">4</span>
                <span className="tab-green">
                  <i>
                    <img
                      src={require("../../static/right-tick-nav.svg").default}
                      alt="right-tick"
                    />
                  </i>
                </span>
                Your Will
              </div>
            </Tab>
          </TabList>

          <TabPanel>
            <div className="personal-full">
              <h2>Personal Information</h2>
              <form id="personal-form">
                <div className="form-row">
                  <div className="form-item">
                    <label>Title: </label>
                    <select
                      value={sal ? sal : "Mr."}
                      onChange={(e) => {
                        setSal(e.target.value);
                      }}
                    >
                      <option value="Mr">Mr.</option>
                      <option value="Ms">Ms.</option>
                      <option value="Mrs">Mrs.</option>
                      <option value="">N/A</option>
                    </select>
                  </div>
                  <div className="form-item" style={{ width: "23%" }}>
                    <label> Full Name</label>
                    <input
                      type="text"
                      required
                      value={name ? name : ""}
                      onChange={validName}
                    ></input>
                    {err.fullname && (
                      <span className="text-danger">{err.fullname}</span>
                    )}
                  </div>
                  <div
                    className="form-item"
                    style={{ width: "30%", marginLeft: "160px" }}
                  >
                    <label>DOB</label>
                    {/* <div><Calendar onChange ={setDob} value = {dob}></Calendar></div> */}
                    <DatePicker
                      onChange={setDobt}
                      value={dobt}
                      minDate={mindate}
                      maxDate={new Date()}
                      format = {'dd-MM-y'}
                    />
                    {/* <input type='date' min='1900' max = '2031' value={dob ? dob : ''} onChange={(e)=>(validDate(e))}></input> */}
                  </div>
                </div>
                <div className="form-row" style={{ marginTop: "20px" }}>
                  <div className="form-item" style={{ width: "30%" }}>
                    <label>Occupation: </label>
                    <p style={{ color: "white" }}>
                      (Note:Muslim religion followers shall require a customized
                      Will due to distinctive Islamic laws. )
                    </p>
                    <select
                      value={occupation ? occupation : "Salaried"}
                      onChange={(e) => {
                        setOccupation(e.target.value);
                        console.log(dob);
                      }}
                    >
                      <option value="Salaried">Salaried</option>
                      <option value="Professional">Professional</option>
                      <option value="Business Owner">Business Owner</option>
                      <option value="Agriculturist">Agriculturist</option>
                      <option value="Retired">Retired</option>
                      <option value="Homemaker">Homemaker</option>
                      <option value="Student">Student</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div
                    className="form-item"
                    style={{ width: "30%", marginLeft: "170px" }}
                  >
                    <label>Religion:</label>
                    <p>
                      (Note:Muslim religion followers shall require a customized
                      Will due to distinctive Islamic laws. To know more contact
                      us at experts@lawtarazoo.com)
                    </p>
                    <select
                      value={religion ? religion : "Hindu"}
                      onChange={(e) => {
                        setReligion(e.target.value);
                      }}
                    >
                      <option value="Hindu">Hindu</option>
                      <option value="Indian Christian">Indian Christian</option>
                      <option value="Parsi">Parsi</option>
                      <option value="Jain">Jain</option>
                      <option value="Buddhist">Buddhist</option>
                      <option value="Sikh">Sikh</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  {religion === "Other" ? (
                    <>
                      <div className="form-item" style={{ paddingTop: "60px" }}>
                        <label>Please Specify </label>
                        <input
                          type="text"
                          value={otherRel}
                          onChange={reloth}
                        ></input>
                      </div>
                      {relerr && <span className="text-danger"> {relerr}</span>}
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-row" style={{ marginTop: "70px" }}>
                  <div className="form-item">
                    <label>Marital Status</label>
                    <select
                      value={maritalStatus}
                      onChange={(e) => setMaritalStatus(e.target.value)}
                    >
                      <option value="">-Select Marital Status-</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Widowed">Widowed</option>
                      <option value="Divorced">Divorced</option>
                    </select>
                  </div>
                  {maritalStatus === "Married" ? (
                    <>
                      <div className="form-item">
                        <label>Spouse's Name </label>
                        <input
                          type="text"
                          value={spouse}
                          onChange={validspouse}
                        ></input>
                        {spouseerr && (
                          <span className="text-danger"> {spouseerr}</span>
                        )}
                      </div>
                      <div className="form-item">
                        <label>Year of Marriage</label>
                        <input
                          type="number"
                          min="1900"
                          max="2024"
                          value={yom}
                          onChange={validYom}
                        ></input>
                        {yomerr && (
                          <span className="text-danger"> {yomerr} </span>
                        )}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {maritalStatus === "Married" ||
                  maritalStatus === "Widowed" ||
                  maritalStatus === "Divorced" ? (
                    <div className="form-item">
                      <label>Do you have childeren?</label>
                      <select
                        value={haveChilderen}
                        onChange={(e) => setHaveChilderen(e.target.value)}
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>
                  ) : (
                    ""
                  )}
                  {haveChilderen === "Yes" ? (
                    <div>
                    <div className="form-item">
                      <label>Number of Children</label>
                      <input
                        type="number"
                        min="1"
                        max="3"
                        value={noOfChilderen}
                        onChange={initializeChildren}
                      ></input>
                    </div>
                    
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                {haveChilderen === "Yes" && maritalStatus !== "Single" ? (
                  <div>
                    {childeren?.map((child, index) => (
                      <div className="form-row">
                        <div className="form-item">
                          <label>{index + 1}. Child Name</label>
                          <input
                            type="text"
                            value={child["childName"]}
                            onChange={(e) => setChildName(e, index)}
                          ></input>
                          {childnameerr[index] && (
                            <span className="text-danger">
                              {" "}
                              {childnameerr[index]}
                            </span>
                          )}
                        </div>
                        <div className="form-item">
                          <label>Child Age</label>
                          <input
                            type="text"
                            value={child["childAge"]}
                            onChange={(e) => setChildAge(e, index)}
                          ></input>
                          {childageerr[index] && (
                            <span className="text-danger">
                              {" "}
                              {childageerr[index]}
                            </span>
                          )}
                        </div>
                        <div className="remove-btn">
                          <CancelIcon
                            onClick={(e) => remChild(e, index)}
                          ></CancelIcon>
                        </div>
                      </div>
                    ))}{" "}
                  </div>
                ) : (
                  ""
                )}

                <h3>Present Address</h3>
                <div className="form-row address-row">
                  <div className="form-item">
                    <div className="form-row">
                      {" "}
                      <label style={{fontWeight:'700'}}>Address Line 1* </label>
                      <p style={{ marginLeft: "10px" }}>
                        {" "}
                        (House Number, Building Name, Etc)
                      </p>
                    </div>
                    <input
                      type="text"
                      style={{ width: "380px" }}
                      value={present1 ? present1 : ""}
                      onChange={(e) => {
                        setpresent1(e.target.value);
                      }}
                    ></input>
                  </div>

                  <div className="form-item">
                    <div className="form-row">
                      {" "}
                      <label style={{fontWeight:'700'}}>Address Line 2 </label>
                      <p style={{ marginLeft: "10px" }}>
                        {" "}
                        (Street, Society, Colony Name)
                      </p>
                    </div>

                    <input
                      type="text"
                      style={{ width: "380px" }}
                      value={present2 ? present2 : ""}
                      onChange={(e) => {
                        setpresent2(e.target.value);
                      }}
                    ></input>
                  </div>
                </div>
                <div className="form-row">
                <div className="form-item">
                    <label>Pin*</label>

                    <input
                      type="text"
                      autoComplete="off"
                      className="form-control"
                      name="pincode"
                      onChange={validPin}
                      value={presentPin ? presentPin : ""}
                      required
                    />
                    {pinerr && <span className="text-danger">{pinerr}</span>}
                  </div>
                  <div className="form-item">
                    <label>City/Town*</label>
                    <input
                      type="text"
                      value={presentCity ? presentCity : ""}
                      onChange={validCity}
                    ></input>
                    {cityerr && <span className="text-danger">{cityerr}</span>}
                  </div>
                  <div className="form-item">
                    <label>State*</label>
                    <input
                      type="text"
                      value={presentState ? presentState : ""}
                      onChange={validState}
                    ></input>
                    {stateerr && (
                      <span className="text-danger">{stateerr}</span>
                    )}
                  </div>

                  
                  <div className="form-item">
                    <label>Country*</label>
                    <input
                      type="text"
                      value={presentCountry ? presentCountry : ""}
                      onChange={(e) => {
                        setPresentCountry(e.target.value);
                      }}
                    ></input>
                  </div>
                </div>

                <h3>Executor</h3>
                <p className="note-para">
                  (NOTE- An executor can be any person whom you trust e.g.
                  Beneficiary, friend, relative, etc. The responsibility of an
                  executor is to distribute the assets as mentioned by the
                  author of the WILL.)
                </p>
                {executors?.map((executor, index) => (
                  <div className="form-row" key={index}>
                    <div className="form-item">
                      <label>Title: </label>
                      <select
                        value={executor["sal"]}
                        onChange={(e) => setExecSal(e, index)}
                      >
                        <option value="Mr">Mr.</option>
                        <option value="Ms">Ms.</option>
                        <option value="Mrs">Mrs.</option>
                        <option value="">N/A</option>
                      </select>
                    </div>
                    <div className="form-item">
                      <label> Full Name*</label>
                      <input
                        type="text"
                        value={executor["name"]}
                        onChange={(e) => {
                          validNameExec(e, index);
                        }}
                      ></input>
                      {execerr[index] && (
                        <span className="text-danger">{execerr[index]}</span>
                      )}
                    </div>
                    <div className="form-item">
                      <label>Relation*</label>
                      {/* <input
                        type="text"
                        value={executor["relation"]}
                        onChange={(e) => {
                          validrelExec(e, index);
                        }}
                      ></input> */}
                      <select
                      value={executor["relation"]}
                      
                      onChange={(e) => {
                        validrelExec(e, index);
                      }}
                      style={{ width: "250px" }}
                    >
                      <option value="Wife">Wife</option>
                      <option value="Husband">Husband</option>
                      <option value="Son">Son</option>
                      <option value="Daughter">Daughter</option>
                      <option value="Neice">Neice</option>
                      <option value="Nephew">Nephew</option>
                      <option value="Brother">Brother</option>
                      <option value="Sister">Sister</option>
                      <option value="Friend">Friend</option>
                      <option value="Acquaintance">Acquaintance</option>
                      <option value="Uncle">Uncle</option>
                      <option value="Aunt">Aunt</option>
                      <option value="Grandson">Grandson</option>
                      <option value="Granddaughter">Granddaughter</option>
                    </select>
                      
                    </div>
                    {executors.length === 1 ? (
                      <div
                        style={{ marginLeft: "30px", justifyContent: "right" }}
                        className="form-row"
                      >
                        <button
                          disabled={executors.length >= 3}
                          onClick={(e) => addExecutor(e)}
                          className="secondary-button add-remove-executor"
                        >
                          ADD EXECUTOR
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                    {executors.length === 2 &&
                    executors.length === index + 1 ? (
                      <div
                        style={{ marginLeft: "30px", justifyContent: "right" }}
                        className="form-row"
                      >
                        <button
                          disabled={executors.length >= 3}
                          onClick={(e) => addExecutor(e)}
                          className="secondary-button add-remove-executor"
                        >
                          ADD EXECUTOR
                        </button>
                        <button
                          disabled={executors.length === 1}
                          onClick={(e) => removeExecutor(e)}
                          className="secondary-button add-remove-executor"
                        >
                          REMOVE EXECUTOR
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                    {executors.length === 3 ? (
                      <div
                        style={{ marginLeft: "30px", justifyContent: "right" }}
                        className="form-row"
                      >
                        <button
                          disabled={executors.length === 1}
                          onClick={(e) => removeExecutor(e)}
                          className="secondary-button add-remove-executor"
                        >
                          Remove Executor
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))}

                <div
                  style={{ justifyContent: "center" }}
                  className="form-row"
                ></div>

                <div
                  style={{ justifyContent: "right", paddingTop: "50px" }}
                  className="form-row"
                >
                  <button
                    type="submit"
                    onClick={(e) => submitPersonal(e)}
                    id="next-btn"
                  >
                    NEXT: ADD BENEFICIARY
                  </button>
                </div>
              </form>
            </div>
            <div className="personal-mob">
              <h2>Personal Information mob</h2>
              <form id="personal-form">
                <div className="form-row">
                  <div className="form-item">
                    <label>Title: </label>
                    <select
                      value={sal ? sal : "Mr."}
                      onChange={(e) => {
                        setSal(e.target.value);
                      }}
                    >
                      <option value="Mr">Mr.</option>
                      <option value="Ms">Ms.</option>
                      <option value="Mrs">Mrs.</option>
                      <option value="">N/A</option>
                    </select>
                  </div>
                  <div className="form-item" style={{ width: "23%" }}>
                    <label> Full Name</label>
                    <input
                      type="text"
                      required
                      value={name ? name : ""}
                      onChange={validName}
                      style={{ width: "250px" }}
                    ></input>
                    {err.fullname && (
                      <span className="text-danger">{err.fullname}</span>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div
                    className="form-item"
                    style={{ width: "30%", marginLeft: "20px" }}
                  >
                    <label>DOB</label>
                    {/* <div><Calendar onChange ={setDob} value = {dob}></Calendar></div> */}
                    <DatePicker
                      onChange={(value) => setDob(value)}
                      value={dob}
                      minDate={mindate}
                      maxDate={new Date()}
                      format = {'dd-MM-y'}
                    />
                    {/* <input type='date' min='1900' max = '2031' value={dob ? dob : ''} onChange={(e)=>(validDate(e))}></input> */}
                  </div>
                </div>
                <div className="form-row" style={{ marginTop: "20px" }}>
                  <div className="form-item" style={{ width: "30%" }}>
                    <label>Occupation: </label>
                    {/* <p style={{ color: 'white' }}>(Note:Muslim religion followers shall require a customized Will due to distinctive Islamic
                                        laws. )</p> */}
                    <select
                      value={occupation ? occupation : "Salaried"}
                      onChange={(e) => {
                        setOccupation(e.target.value);
                        console.log(dob);
                      }}
                    >
                      <option value="Salaried">Salaried</option>
                      <option value="Professional">Professional</option>
                      <option value="Business Owner">Business Owner</option>
                      <option value="Agriculturist">Agriculturist</option>
                      <option value="Retired">Retired</option>
                      <option value="Homemaker">Homemaker</option>
                      <option value="Student">Student</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div
                    className="form-item"
                    style={{
                      width: "80%",
                      marginLeft: "20px",
                      marginTop: "20px",
                    }}
                  >
                    <label>Religion:</label>
                    <p>
                      (Note:Muslim religion followers shall require a customized
                      Will due to distinctive Islamic laws. To know more contact
                      us at experts@lawtarazoo.com)
                    </p>
                    <select
                      value={religion ? religion : "Hindu"}
                      onChange={(e) => {
                        setReligion(e.target.value);
                      }}
                    >
                      <option value="Hindu">Hindu</option>
                      <option value="Indian Christian">Indian Christian</option>
                      <option value="Parsi">Parsi</option>
                      <option value="Jain">Jain</option>
                      <option value="Buddhist">Buddhist</option>
                      <option value="Sikh">Sikh</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  {religion === "Other" ? (
                    <>
                      <div className="form-item" style={{ paddingTop: "60px" }}>
                        <label>Please Specify </label>
                        <input
                          type="text"
                          value={otherRel}
                          onChange={reloth}
                          style={{ width: "250px" }}
                        ></input>
                      </div>
                      {relerr && <span className="text-danger"> {relerr}</span>}
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-row" style={{ marginTop: "70px" }}>
                  <div className="form-item">
                    <label>Marital Status</label>
                    <select
                      value={maritalStatus}
                      onChange={(e) => setMaritalStatus(e.target.value)}
                    >
                      <option value="">-Select Marital Status-</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Widowed">Widowed</option>
                      <option value="Divorced">Divorced</option>
                    </select>
                  </div>
                  {maritalStatus === "Married" ? (
                    <>
                      <div className="form-item">
                        <label>Spouse's Name </label>
                        <input
                          type="text"
                          value={spouse}
                          onChange={validspouse}
                          style={{ width: "250px" }}
                        ></input>
                        {spouseerr && (
                          <span className="text-danger"> {spouseerr}</span>
                        )}
                      </div>
                      <div className="form-item">
                        <label>Year of Marriage</label>
                        <input
                          type="number"
                          min="1900"
                          max="2024"
                          value={yom}
                          onChange={validYom}
                          style={{ width: "250px" }}
                        ></input>
                        {yomerr && (
                          <span className="text-danger"> {yomerr} </span>
                        )}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {maritalStatus === "Married" ||
                  maritalStatus === "Widowed" ||
                  maritalStatus === "Divorced" ? (
                    <div className="form-item">
                      <label>Do you have childeren?</label>
                      <select
                        value={haveChilderen}
                        onChange={(e) => setHaveChilderen(e.target.value)}
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>
                  ) : (
                    ""
                  )}
                  {haveChilderen === "Yes" ? (
                    <div>
                    <div className="form-item">
                      <label>Number of Children</label>
                      <input
                        type="number"
                        min="1"
                        max="3"
                        value={noOfChilderen}
                        onChange={(e) => initializeChildren(e)}
                        style={{ width: "250px" }}
                      ></input>
                    </div>
                    
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                
                
                {haveChilderen === "Yes" && maritalStatus !== "Single" ? (
                  <div>
                    {childeren?.map((child, index) => (
                      <div className="form-row" key={index}>
                        <div className="form-item">
                          <label>{index + 1}. Child Name</label>
                          <input
                            type="text"
                            value={child["childName"]}
                            onChange={(e) => setChildName(e, index)}
                            style={{ width: "250px" }}
                          ></input>
                          {childnameerr[index] && (
                            <span className="text-danger">
                              {" "}
                              {childnameerr[index]}
                            </span>
                          )}
                        </div>
                        <div className="form-item">
                          <label>Child Age</label>
                          <input
                            type="text"
                            value={child["childAge"]}
                            onChange={(e) => setChildAge(e, index)}
                            style={{ width: "250px" }}
                          ></input>
                          {childageerr[index] && (
                            <span className="text-danger">
                              {" "}
                              {childageerr[index]}
                            </span>
                          )}
                        </div>
                        <div className="remove-btn" style ={{paddingTop:'20px'}}>
                          <CancelIcon
                            onClick={(e) => remChild(e, index)}
                          ></CancelIcon>
                        </div>
                      </div>
                    ))}{" "}
                  </div>
                ) : (
                  ""
                )}

                <h3>Present Address</h3>
                <div className="form-row address-row">
                  <div className="form-item">
                    <div className="form-row">
                      {" "}
                      <label style={{fontWeight:'700'}}>Address Line 1* </label>
                      <p style={{ marginLeft: "10px" }}>
                        {" "}
                        (House Number, Building Name, Etc)
                      </p>
                    </div>
                    <input
                      type="text"
                      style={{ width: "250px" }}
                      value={present1 ? present1 : ""}
                      onChange={(e) => {
                        setpresent1(e.target.value);
                      }}
                    ></input>
                  </div>

                  <div className="form-item">
                    <div className="form-row">
                      {" "}
                      <label style={{fontWeight:'700'}}>Address Line 2 </label>
                      <p style={{ marginLeft: "10px" }}>
                        {" "}
                        (Street, Society, Colony Name)
                      </p>
                    </div>

                    <input
                      type="text"
                      style={{ width: "250px" }}
                      value={present2 ? present2 : ""}
                      onChange={(e) => {
                        setpresent2(e.target.value);
                      }}
                    ></input>
                  </div>
                </div>
                <div className="form-row">
                <div className="form-item">
                    <label>Pin*</label>

                    <input
                      type="text"
                      autoComplete="off"
                      className="form-control"
                      name="pincode"
                      onChange={validPin}
                      value={presentPin ? presentPin : ""}
                      required
                      style={{ width: "250px" }}
                    />
                    {pinerr && <span className="text-danger">{pinerr}</span>}
                  </div>
                  <div className="form-item">
                    <label>City/Town*</label>
                    <input
                      type="text"
                      value={presentCity ? presentCity : ""}
                      onChange={validCity}
                      style={{ width: "250px" }}
                    ></input>
                    {cityerr && <span className="text-danger">{cityerr}</span>}
                  </div>
                  <div className="form-item">
                    <label>State*</label>
                    <input
                      type="text"
                      value={presentState ? presentState : ""}
                      onChange={validState}
                      style={{ width: "250px" }}
                    ></input>
                    {stateerr && (
                      <span className="text-danger">{stateerr}</span>
                    )}
                  </div>

                 
                  <div className="form-item">
                    <label>Country*</label>
                    <input
                      type="text"
                      value={presentCountry ? presentCountry : ""}
                      onChange={(e) => {
                        setPresentCountry(e.target.value);
                      }}
                      style={{ width: "250px" }}
                    ></input>
                  </div>
                </div>

                <h3>Executor</h3>
                <p className="note-para">
                  (NOTE- An executor can be any person whom you trust e.g.
                  Beneficiary, friend, relative, etc. The responsibility of an
                  executor is to distribute the assets as mentioned by the
                  author of the WILL.)
                </p>
                {executors?.map((executor, index) => (
                  <div className="form-row" key={index}>
                    <div className="form-item">
                      <label>Title: </label>
                      <select
                        value={executor["sal"]}
                        onChange={(e) => setExecSal(e, index)}
                      >
                        <option value="Mr">Mr.</option>
                        <option value="Ms">Ms.</option>
                        <option value="Mrs">Mrs.</option>
                        <option value="">N/A</option>
                      </select>
                    </div>
                    <div className="form-item">
                      <label> Full Name*</label>
                      <input
                        type="text"
                        value={executor["name"]}
                        onChange={(e) => {
                          validNameExec(e, index);
                        }}
                        style={{ width: "250px" }}
                      ></input>
                      {execerr[index] && (
                        <span className="text-danger">{execerr[index]}</span>
                      )}
                    </div>
                    <div className="form-item">
                      <label>Relation*</label>
                      <select
                      value={executor["relation"]}
                    
                      onChange={(e) => {
                        validrelExec(e, index);
                      }}
                      style={{ width: "250px" }}
                    >
                      <option value="Wife">Wife</option>
                      <option value="Husband">Husband</option>
                      <option value="Son">Son</option>
                      <option value="Daughter">Daughter</option>
                      <option value="Neice">Neice</option>
                      <option value="Nephew">Nephew</option>
                      <option value="Brother">Brother</option>
                      <option value="Sister">Sister</option>
                      <option value="Friend">Friend</option>
                      <option value="Acquaintance">Acquaintance</option>
                      <option value="Uncle">Uncle</option>
                      <option value="Aunt">Aunt</option>
                      <option value="Grandson">Grandson</option>
                      <option value="Granddaughter">Granddaughter</option>
                    </select>
                      {/* <input
                        type="text"
                        value={executor["relation"]}
                        onChange={(e) => {
                          validrelExec(e, index);
                        }}
                        style={{ width: "250px" }}
                      ></input>
                     */}
                    </div>
                    {executors.length === 1 ? (
                      <div
                        style={{ marginLeft: "5px", justifyContent: "right" }}
                        className="form-row"
                      >
                        <button
                          disabled={executors.length >= 3}
                          onClick={(e) => addExecutor(e)}
                          id="next-btn"
                        >
                            ADD EXECUTOR
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                    {executors.length === 2 &&
                    executors.length === index + 1 ? (
                      <div
                        style={{
                          marginLeft: "10px",
                          justifyContent: "right",
                          display: "flex",
                          flexDirection: "row",
                          marginTop: "20px",
                        }}
                        className="form-row"
                      >
                        <button
                          disabled={executors.length >= 3}
                          onClick={(e) => addExecutor(e)}
                          id="next-btn"
                        >
                          ADD
                        </button>
                        <button
                          disabled={executors.length === 1}
                          onClick={(e) => removeExecutor(e)}
                          id="next-btn"
                        >
                          REMOVE
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                    {executors.length === 3 ? (
                      <div
                        style={{
                          marginLeft: "10px",
                          marginTop: "30px",
                          justifyContent: "left",
                        }}
                        className="form-row"
                      >
                        <button
                          disabled={executors.length === 1}
                          onClick={(e) => removeExecutor(e)}
                          id="next-btn"
                        >
                          REMOVE EXECUTOR
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))}

                <div
                  style={{ justifyContent: "center" }}
                  className="form-row"
                ></div>

                <div
                  style={{
                    marginLeft: "10px",
                    justifyContent: "right",
                    paddingTop: "50px",
                  }}
                  className="form-row"
                >
                  <button
                    type="submit"
                    onClick={(e) => submitPersonal(e)}
                    id="next-btn"
                  >
                    NEXT: ADD BENEFICIARY
                  </button>
                </div>
              </form>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="fullscreen-ben">
              <h2>Beneficiary Details</h2>
              <form id="beneficiary-form" style={{ marginTop: "30px" }}>
                <div className="form-row responsive">
                  <div className="form-item">
                    <label>Title: </label>
                    <select
                      value={benSal}
                      onChange={(e) => setBenSal(e.target.value)}
                    >
                      <option value="Mr">Mr.</option>
                      <option value="Ms">Ms.</option>
                      <option value="Mrs">Mrs.</option>
                      <option value="">N/A</option>
                    </select>
                  </div>
                  <div className="form-item">
                    <label> Full Name</label>
                    <input
                      type="text"
                      value={benName}
                      onChange={validbenName}
                    ></input>
                    {bennamer && (
                      <span className="text-danger">{bennamer}</span>
                    )}
                  </div>

                  <div className="form-item">
                    <label>DOB</label>
                    {/* <input value={benDOB} onChange={(e) => setBenDOB(e.target.value)} type='date'></input> */}
                    <DatePicker
                      onChange={(value) => setBenDOB(value)}
                      value={benDOB}
                      minDate={mindate}
                      maxDate={new Date()}
                      format = {'dd-MM-y'}
                    />
                  </div>
                  <div className="form-item" style={{ width: "300px" }}>
                    <label>Relation with Author of Will: </label>
                    {/* <p style={{ width: '275px', fontSize: '16px' }} className="note-para">(eg. friend, son, sister, etc.)</p> */}
                    {/* <input
                      type="text"
                      value={benRelation}
                      onChange={validbenRelation}
                      placeholder="eg.  friend, son, sister, etc. "
                    ></input> */}
                    <select
                      value={benRelation}
                      onChange={validbenRelation}
                     
                    >
                      <option value="Wife">Wife</option>
                      <option value="Husband">Husband</option>
                      <option value="Son">Son</option>
                      <option value="Daughter">Daughter</option>
                      <option value="Neice">Neice</option>
                      <option value="Nephew">Nephew</option>
                      <option value="Brother">Brother</option>
                      <option value="Sister">Sister</option>
                      <option value="Friend">Friend</option>
                      <option value="Acquaintance">Cousin</option>
                      
                      <option value="Grandson">Grandson</option>
                      <option value="Granddaughter">Granddaughter</option>
                      <option value="Uncle">Servant</option>
                    </select>
                  </div>
                  {!(getAge(benDOB) < 18) ? (
                    <>
                      <div
                        style={{ justifyContent: "right", paddingTop: "25px" }}
                        className="form-row"
                      >
                        <button
                          type="submit"
                          onClick={addBeneficiary}
                          className="secondary-button"
                        >
                          <AddIcon /> ADD BENEFICIARY
                        </button>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                {getAge(benDOB) < 18 ? (
                  <div>
                    <h3>Guardian details</h3>
                    <p className="note-para">
                      As the listed beneficiary is Minor, kindly appoint a
                      Guardian*
                      <br />
                      (Note: Guardian should be such a person who will act as a
                      trustee and whatever assets are being receivable by a
                      Minor under WILL be maintained by a Guardian on behalf of
                      a minor till the time he turns 18 years of age.)
                    </p>
                    <div className="form-row">
                      <div className="form-item">
                        <label>Title: </label>
                        <select
                          value={guardianSal}
                          onChange={(e) => setGuardianSal(e.target.value)}
                        >
                          <option value="Mr">Mr.</option>
                          <option value="Ms">Ms.</option>
                          <option value="Mrs">Mrs.</option>
                          <option value="">N/A</option>
                        </select>
                      </div>
                      <div className="form-item">
                        <label> Full Name</label>
                        <input
                          type="text"
                          value={guardianName}
                          onChange={validguardName}
                        ></input>
                        {guardnameerr.length > 0 && (
                          <span className="text-danger"> {guardnameerr}</span>
                        )}
                      </div>
                      <div className="form-item">
                        <label>DOB</label>
                        <DatePicker
                          onChange={(value) => setGuardianDOB(value)}
                          value={guardianDOB}
                          minDate={mindate}
                          maxDate={new Date()}
                          format = {'dd-MM-y'}
                        />
                        {/* <input value={guardianDOB} onChange={(e) => setGuardianDOB(e.target.value)} type='date'></input> */}
                      </div>
                      <div className="form-item">
                        <label>Relation with Minor: </label>
                        {/* <input
                          type="text"
                          value={guardianRelation}
                          onChange={validguardrel}
                        ></input> */}
                         <select
                      value={guardianRelation}
                      onChange={validguardrel}
                     
                    >
                      
                     
                      
                      <option value="Mother">Mother</option>
                      <option value="Father">Father</option>
                      <option value="Brother">Brother</option>
                      <option value="Sister">Sister</option>
                      <option value="Uncle">Uncle</option>
                      <option value="Aunt">Aunt</option>
                      
                      <option value="Grandfather">Grandfather</option>
                      <option value="Grandmother">Grandmother</option>
                     
                    </select>
                        {/* {guardrelerr.length > 0 && (
                          <span className="text-danger">{guardrelerr} </span>
                        )} */}
                      </div>
                      {getAge(benDOB) < 18 ? (
                        <>
                          <div
                            style={{
                              justifyContent: "right",
                              marginLeft: "auto",
                            }}
                            className="form-row"
                          >
                            <button
                              type="submit"
                              onClick={addBeneficiary}
                              className="secondary-button"
                            >
                              <AddIcon /> ADD BENEFICIARY
                            </button>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div
                  style={{ marginTop: "20px", justifyContent: "space-between" }}
                  className="form-row"
                >
                  <button
                    onClick={(e) => setTabIndex(0)}
                    id="next-btn"
                  >
                    Previous
                  </button>
                  <button
                    type= 'button'
                    onClick={initializeShare}
                    id="next-btn"
                  >
                    Next: Asset Details
                  </button>
                </div>
              </form>
              {beneficiaries.length !== 0 ? (
				<div style={{ padding: "0 20px" }} >
                <table className="styled-table">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Relation</th>
                      <th>Modify/Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {beneficiaries.map((ben, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{ben[1]}</td>
                        <td>{getAge(ben[2])}</td>
                        <td>{ben[3]}</td>
                        <td className="remove-btn">
                          <CancelIcon
                            onClick={() => removeBeneficiary(index)}
                          ></CancelIcon>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>) : (
                ""
              )}
            </div>
            <div className="mobilebene">
              <div className="mobile-ben">
                <form id="beneficiary-form" style={{ marginTop: "30px" }}>
                  <div className="form-row responsive">
                    <div className="form-item">
                      <label>Title: </label>
                      <select
                        value={benSal}
                        onChange={(e) => setBenSal(e.target.value)}
                      >
                        <option value="Mr">Mr.</option>
                        <option value="Ms">Ms.</option>
                        <option value="Mrs">Mrs.</option>
                        <option value="">N/A</option>
                      </select>
                    </div>
                    <div className="form-item">
                      <label> Full Name</label>
                      <input
                        type="text"
                        value={benName}
                        onChange={validbenName}
                      ></input>
                      {bennamer && (
                        <span className="text-danger">{bennamer}</span>
                      )}
                    </div>
                  </div>
                  <div className="form-row responsive">
                    <div className="form-item">
                      <label>DOB</label>
                      {/* <input value={benDOB} onChange={(e) => setBenDOB(e.target.value)} type='date'></input> */}
                      <DatePicker
                        onChange={(value) => setBenDOB(value)}
                        value={benDOB}
                        minDate={mindate}
                        maxDate={new Date()}
                      />
                    </div>
                  </div>
                  <div className="form-row responsive">
                    <div className="form-item" style={{ width: "300px" }}>
                      <label>Relation with Author of Will: </label>
                      {/* <p style={{ width: '275px', fontSize: '16px' }} className="note-para">(eg. friend, son, sister, etc.)</p> */}
                      {/* <input
                        type="text"
                        value={benRelation}
                        onChange={validbenRelation}
                        placeholder="eg.  friend, son, sister, etc. "
                      ></input>
                      {benrelerr.length > 0 && (
                        <span className="text-danger"> {benrelerr}</span>
                      )} */}
                       <select
                      value={benRelation}
                      onChange={validbenRelation}
                     
                    >
                      <option value="Wife">Wife</option>
                      <option value="Husband">Husband</option>
                      <option value="Son">Son</option>
                      <option value="Daughter">Daughter</option>
                      <option value="Neice">Neice</option>
                      <option value="Nephew">Nephew</option>
                      <option value="Brother">Brother</option>
                      <option value="Sister">Sister</option>
                      <option value="Friend">Friend</option>
                      <option value="Acquaintance">Cousin</option>
                      
                      <option value="Grandson">Grandson</option>
                      <option value="Granddaughter">Granddaughter</option>
                      <option value="Uncle">Servant</option>
                    </select>
                    </div>
                  </div>
                  <div className="form-row responsive">
                    {!(getAge(benDOB) < 18) ? (
                      <>
                        <div
                          style={{
                           
                            paddingTop: "25px",
                            paddingLeft: "20px",
                          }}
                          className="form-row"
                        >
                          <button
                            type="submit"
                            onClick={addBeneficiary}
                            className="secondary-button"
                          >
                            <AddIcon /> ADD BENEFICIARY
                          </button>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  {getAge(benDOB) < 18 ? (
                    <div>
                      <h3>Guardian details</h3>
                      <p className="note-para">
                        As the listed beneficiary is Minor, kindly appoint a
                        Guardian*
                        <br />
                        (Note: Guardian should be such a person who will act as
                        a trustee and whatever assets are being receivable by a
                        Minor under WILL be maintained by a Guardian on behalf
                        of a minor till the time he turns 18 years of age.)
                      </p>
                      <div className="form-row">
                        <div className="form-item">
                          <label>Title: </label>
                          <select
                            value={guardianSal}
                            onChange={(e) => setGuardianSal(e.target.value)}
                          >
                            <option value="Mr">Mr.</option>
                            <option value="Ms">Ms.</option>
                            <option value="Mrs">Mrs.</option>
                            <option value="">N/A</option>
                          </select>
                        </div>
                        <div className="form-item">
                          <label> Full Name</label>
                          <input
                            type="text"
                            value={guardianName}
                            onChange={validguardName}
                          ></input>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-item">
                          <label>DOB</label>
                          <DatePicker
                            onChange={(value) => setGuardianDOB(value)}
                            value={guardianDOB}
                            minDate={mindate}
                            maxDate={new Date()}
                          />
                          {/* <input value={guardianDOB} onChange={(e) => setGuardianDOB(e.target.value)} type='date'></input> */}
                          {guardnameerr.length > 0 && (
                            <span className="text-danger"> {guardnameerr}</span>
                          )}
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-item">
                          <label>Relation with Minor: </label>
                          {/* <input
                            type="text"
                            value={guardianRelation}
                            onChange={validguardrel}
                          ></input>

                          {guardrelerr.length > 0 && (
                            <span className="text-danger">{guardrelerr} </span>
                          )} */}
                          <select
                      value={guardianRelation}
                      onChange={validguardrel}
                     
                    >
                      
                     
                      
                      <option value="Mother">Mother</option>
                      <option value="Father">Father</option>
                      <option value="Brother">Brother</option>
                      <option value="Sister">Sister</option>
                      <option value="Uncle">Uncle</option>
                      <option value="Aunt">Aunt</option>
                      
                      <option value="Grandfather">Grandfather</option>
                      <option value="Grandmother">Grandmother</option>
                     
                    </select>
                        </div>
                      </div>
                      <div className="form-row">
                        {getAge(benDOB) < 18 ? (
                          <>
                            <div
                              style={{
                               
                                paddingTop: "25px",
                                paddingLeft: "20px",
                              }}
                              className="form-row"
                            >
                              <button
                                type="submit"
                                onClick={addBeneficiary}
                                className="secondary-button"
                              >
                                <AddIcon /> ADD BENEFICIARY
                              </button>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  <div
                    style={{
                      justifyContent: "space-between",
                      marginTop: "20px",
                    }}
                    className="form-row"
                  >
                    <button
                      onClick={() => {
                        setTabIndex(0);
                      }}
                      id="next-btn"
                    >
                      Previous
                    </button>
                    <button onClick={initializeShare} id="next-btn">
                      Next
                    </button>
                  </div>
                </form>
                {beneficiaries.length !== 0 ? (
					<div style={{ padding: "0 20px" }} >
                  <table className="styled-table">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Relation</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {beneficiaries.map((ben, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{ben[1]}</td>
                          <td>{getAge(ben[2])}</td>
                          <td>{ben[3]}</td>
                          <td className="remove-btn">
                            <CancelIcon
                              onClick={() => removeBeneficiary(index)}
                            ></CancelIcon>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>) : (
                  ""
                )}
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <Tabs
              selectedIndex={tabIndex1}
              onSelect={(e) => onTabSelect("assetsNav", e)}
            >
              <TabList style={{ display: "none" }}>
                <Tab>Assets</Tab>
                <Tab></Tab>
                <Tab></Tab>
              </TabList>

              <TabPanel>
                {/* {assetPin.length ===6 && <GetApi setPresentCity ={setAssetCity} setPresentState= {setAssetState} pin ={assetPin}/>} */}

                <h2>Distribution of your Assets</h2>
                <h3
                  onClick={() =>
                    setImmovVisible(immovVisible === "none" ? "block" : "none")
                  }
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                  className="asset-tab"
                >
                  My Immovable Property
                  <ArrowDropDownIcon />
                </h3>
                <div style={{ display: immovVisible }}>
                  <div className="fullscreen-assets">
                    <form style={{ width: "100%" }}>
                      <div className="form-row">
                        <div className="form-item">
                          <label>Asset Type: </label>
                          <select
                            value={assetType1}
                            onChange={(e) => setAssetType1(e.target.value)}
                          >
                            <option value="Flat">Flat</option>
                            <option value="Land">Land</option>
                            <option value="House">House</option>
                          </select>
                        </div>
                      </div>
                      {assetType1 === "Flat" ||
                      assetType1 === "Land" ||
                      assetType1 === "House" ? (
                        <div>
                          <div className="form-row">
                            <div className="form-item">
                              <label>Area of {assetType1} </label>
                              <input
                                type="number"
                                value={area}
                                onChange={validflatarea}
                              ></input>
                              {flatarea && (
                                <span className="text-danger">{flatarea}</span>
                              )}
                            </div>
                            <div className="form-item">
                              <label>Area Unit</label>
                              <select
                                value={assetAreaUnit}
                                onChange={(e) =>
                                  setAssetAreaUnit(e.target.value)
                                }
                              >
                                <option value="">-Select Area Unit-</option>
                                <option value="Acres">Acres</option>
                                <option value="Gunthas">Gunthas</option>
                                <option value="Sq. Metres">Sq. Metres</option>
                                <option value="Sq. Feet">Sq. Feet</option>
                                <option value="Sq. Yards">Sq. Yards</option>
                                <option value="Hectare">Hectare</option>
                              </select>
                            </div>
                            <div className="form-item">
                              <label>Ownership</label>
                              <div style={{ marginTop: "10px" }}>
                                <input
                                  type="radio"
                                  value="Solely Owned"
                                  checked={ownership === "Solely Owned"}
                                  onClick={(e) => setOwnership(e.target.value)}
                                ></input>
                                <label style={{ marginLeft: "10px" }}>
                                  Solely Owned
                                </label>
                                <input
                                  style={{ marginLeft: "15px" }}
                                  type="radio"
                                  value="Jointly Owned"
                                  checked={ownership === "Jointly Owned"}
                                  onClick={(e) => setOwnership(e.target.value)}
                                ></input>
                                <label style={{ marginLeft: "10px" }}>
                                  Jointly Owned
                                </label>
                              </div>
                            </div>
                          </div>
                          <h3>Detailed Address</h3>
                          <div className="form-row address-row">
                            <div className="form-item">
                              <div className="form-row">
                                {" "}
                                <label>Address Line 1* </label>
                                <p style={{ marginLeft: "10px" }}>
                                  {" "}
                                  (House Number, Building Name, Etc)
                                </p>
                              </div>
                              <input
                                type="text"
                                style={{ width: "380px" }}
                                value={assetAddress1}
                                onChange={(e) =>
                                  setAssetAddress1(e.target.value)
                                }
                              ></input>
                            </div>
                          </div>
                          <div className="form-row address-row">
                            <div className="form-item">
                              <div className="form-row">
                                {" "}
                                <label>Address Line 2 </label>
                                <p style={{ marginLeft: "10px" }}>
                                  {" "}
                                  (Street, Society, Colony Name)
                                </p>
                              </div>

                              <input
                                type="text"
                                style={{ width: "380px" }}
                                value={assetAddress2}
                                onChange={(e) =>
                                  setAssetAddress2(e.target.value)
                                }
                              ></input>
                            </div>
                          </div>
                          <div className="form-row">
                          <div className="form-item">
                              <label>Pin*</label>
                              <input
                                type="text"
                                value={assetPin}
                                onChange={validPin1}
                              ></input>
                              {assetPin && (
                                <span className="text-danger">{imaerr}</span>
                              )}
                            </div>
                            <div className="form-item">
                              <label>City/Town*</label>
                              <input
                                type="text"
                                value={assetCity}
                                onChange={validCity1}
                              ></input>
                              {assetCity && (
                                <span className="text-danger">
                                  {imacityerr}
                                </span>
                              )}
                            </div>
                            
                          </div>
                          <div className="form-row">
                          <div className="form-item">
                              <label>State*</label>
                              <input
                                type="text"
                                value={assetState}
                                onChange={validState1}
                              ></input>
                              {assetState && (
                                <span className="text-danger">
                                  {imastateerr}
                                </span>
                              )}
                            </div>
                            <div className="form-item">
                              <label>Country*</label>
                              <input
                                type="text"
                                value={assetCountry}
                                onChange={(e) =>
                                  setAssetCountry(e.target.value)
                                }
                              ></input>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <h3>Allocate to: </h3>
                      {beneficiaries.length !== 0 ? (
						<div style={{ padding: "0 20px" }} >
                        <table className="styled-table">
                          <thead>
                            <tr>
                              <th>No.</th>
                              <th>Name</th>
                              <th>% Share</th>
                            </tr>
                          </thead>
                          <tbody>
                            {beneficiaries.map((ben, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{ben[1]}</td>

                                <td>
                                  <input
                                    value={
                                      share[index] ? share[index]["value"] : 0
                                    }
                                    onChange={(e) =>
                                      handleShareChange(
                                        e,
                                        ben[1],
                                        ben[2],
                                        index
                                      )
                                    }
                                    type="number"
                                    min="0"
                                    max="100"
                                  ></input>
                                  %
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>) : (
                        ""
                      )}
                      <div
                        style={{margin: "20px" }}
                        className="form-row"
                      >
                        <button
                          type="button"
                          onClick={(e) => addImmovableAsset(e)}
                          className="secondary-button"
                        >
                          <AddIcon /> ADD ASSET
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="mobile-asset">
                    <form style={{ width: "100%" }}>
                      <div className="form-row">
                        <div className="form-item">
                          <label>Asset Type: </label>
                          <select
                            value={assetType1}
                            onChange={(e) => setAssetType1(e.target.value)}
                          >
                            <option value="Flat">Flat</option>
                            <option value="Land">Land</option>
                            <option value="House">House</option>
                          </select>
                        </div>
                      </div>
                      {assetType1 === "Flat" ||
                      assetType1 === "Land" ||
                      assetType1 === "House" ? (
                        <div>
                          <div className="form-row">
                            <div className="form-item" style={{ width: "30%" }}>
                              <label>Area of {assetType1} </label>
                              <input
                                type="text"
                                value={area}
                                onChange={validflatarea}
                              ></input>
                              {flatarea && (
                                <span className="text-danger">{flatarea}</span>
                              )}
                            </div>
                            <div className="form-item">
                              <label>Area Unit</label>
                              <select
                                value={assetAreaUnit}
                                onChange={(e) =>
                                  setAssetAreaUnit(e.target.value)
                                }
                              >
                                <option value="">-Select Area Unit-</option>
                                <option value="Acres">Acres</option>
                                <option value="Gunthas">Gunthas</option>
                                <option value="Sq. Metres">Sq. Metres</option>
                                <option value="Sq. Feet">Sq. Feet</option>
                                <option value="Sq. Yards">Sq. Yards</option>
                                <option value="Hectare">Hectare</option>
                              </select>
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-item">
                              <label>Ownership</label>
                              <div style={{ marginTop: "10px" }}>
                                <input
                                  type="radio"
                                  value="Solely Owned"
                                  checked={ownership === "Solely Owned"}
                                  onClick={(e) => setOwnership(e.target.value)}
                                ></input>
                                <label style={{ marginLeft: "10px" }}>Solely Owned</label>
                                <input
                                  style={{ marginLeft: "15px" }}
                                  type="radio"
                                  value="Jointly Owned"
                                  checked={ownership === "Jointly Owned"}
                                  onClick={(e) => setOwnership(e.target.value)}
                                ></input>
                                <label style={{ marginLeft: "10px" }}>Jointly Owned</label>
                              </div>
                            </div>
                          </div>
                          <h3>Detailed Address</h3>
                          <div className="form-row address-row">
                            <div className="form-item">
                              <div className="form-row">
                                {" "}
                                <label>Address Line 1* </label>
                                <p style={{ marginLeft: "10px" }}>
                                  {" "}
                                  (House Number, Building Name, Etc)
                                </p>
                              </div>
                              <input
                                type="text"
                                style={{ width: "100%" }}
                                value={assetAddress1}
                                onChange={(e) =>
                                  setAssetAddress1(e.target.value)
                                }
                              ></input>
                            </div>
                          </div>
                          <div className="form-row address-row">
                            <div className="form-item">
                              <div className="form-row">
                                {" "}
                                <label>Address Line 2 </label>
                                <p style={{ marginLeft: "10px" }}>
                                  {" "}
                                  (Street, Society, Colony Name)
                                </p>
                              </div>

                              <input
                                type="text"
                                style={{ width: "100%" }}
                                value={assetAddress2}
                                onChange={(e) =>
                                  setAssetAddress2(e.target.value)
                                }
                              ></input>
                            </div>
                          </div>
                          <div className="form-row">
                          <div className="form-item" style={{ width: "30%" }}>
                              <label>Pin*</label>
                              <input
                                type="text"
                                value={assetPin}
                                onChange={validPin1}
                              ></input>
                              {assetPin && (
                                <span className="text-danger">{imaerr}</span>
                              )}
                            </div>
                            <div className="form-item" style={{ width: "30%" }}>
                              <label>City/Town*</label>
                              <input
                                type="text"
                                value={assetCity}
                                onChange={validCity1}
                              ></input>
                              {assetCity && (
                                <span className="text-danger">
                                  {imacityerr}
                                </span>
                              )}
                            </div>
                            
                          </div>
                          <div className="form-row">
                          <div className="form-item" style={{ width: "38%" }}>
                              <label>State*</label>
                              <input
                                type="text"
                                value={assetState}
                                onChange={validState1}
                              ></input>
                              {assetState && (
                                <span className="text-danger">
                                  {imastateerr}
                                </span>
                              )}
                            </div>
                            <div className="form-item" style={{ width: "30%" }}>
                              <label>Country*</label>
                              <input
                                type="text"
                                value={assetCountry}
                                onChange={(e) =>
                                  setAssetCountry(e.target.value)
                                }
                              ></input>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <h3>Allocate to: </h3>
                      {beneficiaries.length !== 0 ? (
							<div style={{ padding: "0 20px" }} >
                        <table className="styled-table">
                          <thead>
                            <tr>
                              <th>No.</th>
                              <th>Name</th>
                              <th>% Share</th>
                            </tr>
                          </thead>
                          <tbody>
                            {beneficiaries.map((ben, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{ben[1]}</td>

                                <td>
                                  <input
                                    value={
                                      share[index] ? share[index]["value"] : 0
                                    }
                                    onChange={(e) =>
                                      handleShareChange(
                                        e,
                                        ben[1],
                                        ben[2],
                                        index
                                      )
                                    }
                                    type="number"
                                    min="0"
                                    max="100"
                                  ></input>
                                  %
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div> ) : (
                        ""
                      )}
                      <div
                        style={{  margin: "20px" }}
                        className="form-row"
                      >
                        <button
                          type="button"
                          onClick={(e) => addImmovableAsset(e)}
                          className="secondary-button"
                        >
                          <AddIcon /> ADD ASSET
                        </button>
                      </div>
                    </form>
                  </div>

                  {immovableAssets.length !== 0 ? (
                    <h3>Immovable Assets Allocation</h3>
                  ) : (
                    ""
                  )}
                  {immovableAssets.length !== 0 ? (
                    <div style={{ padding: "0 20px" }} >
                    <table className="styled-table">
                      <thead>
                        <tr>
                          <th>No.</th>

                          <th>Details</th>
                          <th>Successors</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {immovableAssets.map((iA, index) => (
                          <tr key={index}>
                            <td style={{ textAlign: "-moz-center" }}>
                              <tr>{index + 1}</tr>
                            </td>
                            <td>
                              <tr>{iA["assetType"]}</tr>
                              <tr>{iA["description"]}</tr>
                            </td>
                            <td>
                              <ul>
                                {iA["share"].map((share, sindex) => (
                                  <li key={sindex}>
                                    {" "}
                                    {share["value"] !== "0" ? (
                                      <span>
                                        {share["name"]} {share["value"]}%{" "}
                                      </span>
                                    ) : (
                                      ""
                                    )}{" "}
                                  </li>
                                ))}
                              </ul>
                            </td>

                            <td className="remove-btn">
                              <CancelIcon
                                onClick={() => removeImmovable(index)}
                              ></CancelIcon>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <h3
                  onClick={() =>
                    setMovVisible(movVisible === "none" ? "block" : "none")
                  }
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                  className="asset-tab"
                >
                  My Movable Property
                  <ArrowDropDownIcon />
                </h3>

                <div style={{ display: movVisible, transition: "0.3s" }}>
                  <div className="immovasefull">
                    <form >
                      <div className="form-row">
                        <div className="form-item">
                          <label>Asset Type: </label>
                          <select
                            value={assetType}
                            onChange={(e) => setAssetType(e.target.value)}
                          >
                            <option value="Bank Account">Bank Account</option>
                            <option value="Fixed Deposit">Fixed Deposit</option>
                            <option value="Safe Deposit Locker">
                              Safe Deposit Locker
                            </option>
                            <option value="Shares and Demat Account">
                              Shares and Demat Account
                            </option>
                            <option value="Mutual Funds">Mutual Funds</option>
                            <option value="Postal Recurring">
                              Postal Recurring
                            </option>
                            <option value="National Savings Certificate(NSC)">
                              National Savings Certificate(NSC)
                            </option>
                            <option value="Public Provident Fund (PPF)/ Gratuity">
                              Public Provident Fund (PPF)/ Gratuity
                            </option>
                            <option value="Insurance Policies">
                              Insurance Policies
                            </option>
                            <option value="Bond Debentures">
                              Bond Debentures
                            </option>
                            <option value="Income & Pension Accounts">
                              Income & Pension Accounts
                            </option>
                            <option value="Business Asset">
                              Business Assets
                            </option>
                            <option value="Digital Asset">
                              Digital Assets
                            </option>
                            <option value="Electronics and Appliances">
                              Electronics and Appliances
                            </option>
                            <option value="Vehicles">Vehicles</option>
                            <option value="Jewellery">Jewellery</option>
                            <option value="Any other Investments">
                              Any other Investments
                            </option>
                          </select>
                        </div>
                      </div>
                      {assetType === "Mutual Funds" ? (
                        <div className="form-row">
                          <div className="form-item">
                            <label>Description of {assetType}</label>
                            <p>
                              (*Note- Specify the mutual funds held by you on
                              present date and any change subsequently is taken
                              care of by the residuary clause in the Will.)
                            </p>
                            <textarea
                              style={{ width: "600px", height: "250px" }}
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {assetType === "Jewellery" ? (
                        <div className="form-row">
                          <div className="form-item">
                            <label>Description of {assetType}</label>

                            <textarea
                              style={{ width: "600px", height: "250px" }}
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              placeholder="e.g.
Gold bangles, necklaces, silver ornaments,silver utensils, etc "
                            ></textarea>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {assetType === "Business Asset" ? (
                        <div className="form-row">
                          <div className="form-item">
                            <label>Description of {assetType}</label>

                            <textarea
                              style={{ width: "600px", height: "250px" }}
                              placeholder="e.g.Share in the Partnership Firm XYZ, Proprietorship, or any business venture, etc."
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {assetType === "Digital Asset" ? (
                        <div className="form-row">
                          <div className="form-item">
                            <label>Description of {assetType}</label>

                            <textarea
                              style={{ width: "600px", height: "250px" }}
                              placeholder="e.g. E-mail accounts, Website urls, Bitcoins, etc"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {assetType === "Electronics and Appliances" ? (
                        <div className="form-row">
                          <div className="form-item">
                            <label>Description of {assetType}</label>

                            <textarea
                              style={{ width: "600px", height: "250px" }}
                              placeholder="(e.g.
Laptops, Mobiles, Tablets, ipad, etc)"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {assetType === "Any other Investments" ? (
                        <div className="form-row">
                          <div className="form-item">
                            <label>Description of {assetType}</label>

                            <textarea
                              style={{ width: "600px", height: "250px" }}
                              placeholder="any
kind of investment apart from the list mentioned above"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      {assetType === "Income & Pension Accounts" ||
                      assetType === "Public Provident Fund (PPF)/ Gratuity" ||
                      assetType === "Bank Account" ||
                      assetType === "Fixed Deposit" ||
                      assetType === "Safe Deposit Locker" ||
                      assetType === "Shares and Demat Account" ? (
                        <div className="form-row">
                          <div className="form-item">
                            <label>
                              Bank
                              {assetType === "Shares and Demat Account"
                                ? "/Company"
                                : ""}{" "}
                              Name
                            </label>
                            <input
                              type="text"
                              value={bankName ? bankName : ""}
                              onChange={(e) => setBankName(e.target.value)}
                            ></input>
                          </div>
                          <div className="form-item">
                            <label>
                              {assetType === "Shares and Demat Account"
                                ? "DMAT "
                                : ""}
                              {assetType === "Bank Account" ||
                              assetType === "Safe Deposit Locker" ||
                              assetType === "Shares and Demat Account" ||
                              assetType ===
                                "Public Provident Fund (PPF)/ Gratuity" ||
                              assetType === "Income & Pension Accounts"
                                ? "Account"
                                : ""}
                              {assetType === "Fixed Deposit" ? "FD" : ""} Number
                            </label>
                            <input
                              type="text"
                              value={bankNumber ? bankNumber : ""}
                              onChange={(e) => setBankNumber(e.target.value)}
                            ></input>
                          </div>
                          <div className="form-item">
                            <label>
                              Branch
                              {assetType === "Shares and Demat Account"
                                ? "/Address "
                                : ""}
                            </label>
                            <input
                              type="text"
                              value={bankBranch ? bankBranch : ""}
                              onChange={(e) => setBankBranch(e.target.value)}
                            ></input>
                          </div>
                          {assetType === "Safe Deposit Locker" ||
                          assetType ===
                            "Public Provident Fund (PPF)/ Gratuity" ? (
                            <div className="form-item">
                              <label>
                                {assetType ===
                                "Public Provident Fund (PPF)/ Gratuity"
                                  ? "PPF Number"
                                  : "Locker Number"}
                              </label>
                              <input
                                type="text"
                                value={bankLocker ? bankLocker : ""}
                                onChange={(e) => setBankLocker(e.target.value)}
                              ></input>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                      {assetType === "Postal Recurring" ||
                      assetType === "National Savings Certificate(NSC)" ? (
                        <div className="form-row">
                          <div className="form-item">
                            <label>Name of the Bank/Post Office/Company</label>
                            <input
                              type="text"
                              value={bankName ? bankName : ""}
                              onChange={(e) => setBankName(e.target.value)}
                            ></input>
                          </div>
                          <div className="form-item">
                            <label>
                              {assetType === "National Savings Certificate(NSC)"
                                ? "NSC "
                                : "Account "}
                              Number
                            </label>
                            <input
                              type="text"
                              value={bankNumber ? bankNumber : ""}
                              onChange={(e) => setBankNumber(e.target.value)}
                            ></input>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {assetType === "Insurance Policies" ||
                      assetType === "Bond Debentures" ? (
                        <div className="form-row">
                          <div className="form-item">
                            <label>
                              Name of{" "}
                              {assetType === "Insurance Policies"
                                ? "Insurance"
                                : "the Bond"}
                            </label>
                            <input
                              type="text"
                              value={assetName ? assetName : ""}
                              onChange={(e) => setAssetName(e.target.value)}
                            ></input>
                          </div>
                          <div className="form-item">
                            <label>
                              {assetType === "Insurance Policies"
                                ? "Policy "
                                : "Bond "}
                              Number
                            </label>
                            <input
                              type="text"
                              value={policyNumber ? policyNumber : ""}
                              onChange={(e) => setPolicyNumber(e.target.value)}
                            ></input>
                          </div>
                          {assetType === "Insurance Policies" ? (
                            <div className="form-item">
                              <label>Policy Name</label>
                              <input
                                type="text"
                                value={policyName ? policyName : ""}
                                onChange={(e) => setPolicyName(e.target.value)}
                              ></input>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                      {assetType === "Vehicles" ? (
                        <div className="form-row">
                          <div className="form-item">
                            <label>Vehicle Brand</label>
                            <input
                              type="text"
                              value={brand ? brand : ""}
                              onChange={(e) => setBrand(e.target.value)}
                            ></input>
                          </div>
                          <div className="form-item">
                            <label>Model</label>
                            <input
                              type="text"
                              value={model ? model : ""}
                              onChange={(e) => setModel(e.target.value)}
                            ></input>
                          </div>
                          <div className="form-item">
                            <label>Registration Number</label>
                            <input
                              type="text"
                              value={vehicleNumber ? vehicleNumber : ""}
                              onChange={(e) => setVehicleNumber(e.target.value)}
                            ></input>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <h3>Allocate to: </h3>
                      {beneficiaries.length !== 0 ? (
						<div style={{ padding: "0 20px" }} >
                        <table className="styled-table">
                          <thead>
                            <tr>
                              <th>No.</th>
                              <th>Name</th>
                              <th>% Share</th>
                            </tr>
                          </thead>
                          <tbody>
                            {beneficiaries.map((ben, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{ben[1]}</td>
                                <td>
                                  <input
                                    value={
                                      share[index] ? share[index]["value"] : 0
                                    }
                                    onChange={(e) =>
                                      handleShareChange(
                                        e,
                                        ben[1],
                                        ben[2],
                                        index
                                      )
                                    }
                                    type="number"
                                    min="0"
                                    max="100"
                                  ></input>
                                  %
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>) : (
                        ""
                      )}
                      <div
                        style={{margin: "20px" }}
                        className="form-row"
                      >
                        <button
                          type="submit"
                          onClick={(e) => addAsset(e)}
                          className="secondary-button"
                        >
                          <AddIcon /> ADD ASSET
                        </button>
                      </div>
                      {movableAssets.length !== 0 ? (
                        <h3>Movable Assets Allocation</h3>
                      ) : (
                        ""
                      )}
                      {movableAssets.length !== 0 ? (
                        <div style={{ padding: "0 20px" }} >
                        <table className="styled-table">
                          <thead>
                            <tr>
                              <th>No.</th>
                              <th>Type</th>
                              <th>Details</th>
                              <th>Successors</th>
                              <th>Modify/Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {movableAssets.map((iA, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{iA["assetType"]}</td>
                                <td>{iA["description"]}</td>
                                <td>
                                  <ul>
                                    {iA["share"].map((share, sindex) => (
                                      <li key={sindex}>
                                        {" "}
                                        {share["value"] !== "0" ? (
                                          <span>
                                            {share["name"]} {share["value"]}%{" "}
                                          </span>
                                        ) : (
                                          ""
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                </td>
                                <td className="remove-btn">
                                  <CancelIcon
                                    onClick={() => removeMovable(index)}
                                  ></CancelIcon>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        </div>
                      ) : (
                        ""
                      )}
                    </form>
                  </div>

                  <div className="immovassmob">
                    <form style={{ width: "100%" }}>
                      <div className="form-row">
                        <div className="form-item">
                          <label>Asset Type: </label>
                          <select
                            value={assetType}
                            onChange={(e) => setAssetType(e.target.value)}
                          >
                            <option value="Bank Account">Bank Account</option>
                            <option value="Fixed Deposit">Fixed Deposit</option>
                            <option value="Safe Deposit Locker">
                              Safe Deposit Locker
                            </option>
                            <option value="Shares and Demat Account">
                              Shares and Demat Account
                            </option>
                            <option value="Mutual Funds">Mutual Funds</option>
                            <option value="Postal Recurring">
                              Postal Recurring
                            </option>
                            <option value="National Savings Certificate(NSC)">
                              National Savings Certificate(NSC)
                            </option>
                            <option value="Public Provident Fund (PPF)/ Gratuity">
                              Public Provident Fund (PPF)/ Gratuity
                            </option>
                            <option value="Insurance Policies">
                              Insurance Policies
                            </option>
                            <option value="Bond Debentures">
                              Bond Debentures
                            </option>
                            <option value="Income & Pension Accounts">
                              Income & Pension Accounts
                            </option>
                            <option value="Business Asset">
                              Business Assets
                            </option>
                            <option value="Digital Asset">
                              Digital Assets
                            </option>
                            <option value="Electronics and Appliances">
                              Electronics and Appliances
                            </option>
                            <option value="Vehicles">Vehicles</option>
                            <option value="Jewellery">Jewellery</option>
                            <option value="Any other Investments">
                              Any other Investments
                            </option>
                          </select>
                        </div>
                      </div>
                      {assetType === "Mutual Funds" ? (
                        <div className="form-row">
                          <div className="form-item">
                            <label>Description of {assetType}</label>
                            <p>
                              (*Note- Specify the mutual funds held by you on
                              present date and any change subsequently is taken
                              care of by the residuary clause in the Will.)
                            </p>
                            <textarea
                              style={{ width: "300px", height: "150px" }}
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {assetType === "Jewellery" ? (
                        <div className="form-row">
                          <div className="form-item">
                            <label>Description of {assetType}</label>

                            <textarea
                              style={{ width: "300px", height: "150px" }}
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              placeholder="e.g.
Gold bangles, necklaces, silver ornaments,silver utensils, etc "
                            ></textarea>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {assetType === "Business Asset" ? (
                        <div className="form-row">
                          <div className="form-item">
                            <label>Description of {assetType}</label>

                            <textarea
                              style={{ width: "300px", height: "150px" }}
                              placeholder="e.g.Share in the Partnership Firm XYZ, Proprietorship, or any business venture, etc."
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {assetType === "Digital Asset" ? (
                        <div className="form-row">
                          <div className="form-item">
                            <label>Description of {assetType}</label>

                            <textarea
                              style={{ width: "300px", height: "150px" }}
                              placeholder="e.g. E-mail accounts, Website urls, Bitcoins, etc"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {assetType === "Electronics and Appliances" ? (
                        <div className="form-row">
                          <div className="form-item">
                            <label>Description of {assetType}</label>

                            <textarea
                              style={{ width: "300px", height: "150px" }}
                              placeholder="(e.g.
Laptops, Mobiles, Tablets, ipad, etc)"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {assetType === "Any other Investments" ? (
                        <div className="form-row">
                          <div className="form-item">
                            <label>Description of {assetType}</label>

                            <textarea
                              style={{ width: "300px", height: "150px" }}
                              placeholder="any
kind of investment apart from the list mentioned above"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}

                      {assetType === "Income & Pension Accounts" ||
                      assetType === "Public Provident Fund (PPF)/ Gratuity" ||
                      assetType === "Bank Account" ||
                      assetType === "Fixed Deposit" ||
                      assetType === "Safe Deposit Locker" ||
                      assetType === "Shares and Demat Account" ? (
                        <div>
                          <div className="form-row">
                            <div className="form-item">
                              <label>
                                {assetType === "Shares and Demat Account"
                                  ? "DMAT "
                                  : ""}
                                {assetType === "Bank Account" ||
                                assetType === "Safe Deposit Locker" ||
                                assetType === "Shares and Demat Account" ||
                                assetType ===
                                  "Public Provident Fund (PPF)/ Gratuity" ||
                                assetType === "Income & Pension Accounts"
                                  ? "Account"
                                  : ""}
                                {assetType === "Fixed Deposit" ? "FD" : ""}{" "}
                                Number
                              </label>
                              <input
                                type="text"
                                value={bankNumber ? bankNumber : ""}
                                onChange={(e) => setBankNumber(e.target.value)}
                              ></input>
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-item">
                              <label>
                                Bank
                                {assetType === "Shares and Demat Account"
                                  ? "/Company"
                                  : ""}{" "}
                                Name
                              </label>
                              <input
                                type="text"
                                value={bankName ? bankName : ""}
                                onChange={(e) => setBankName(e.target.value)}
                              ></input>
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-item" style={{ width: "35%" }}>
                              <label>
                                Branch
                                {assetType === "Shares and Demat Account"
                                  ? "/Address "
                                  : ""}
                              </label>
                              <input
                                type="text"
                                value={bankBranch ? bankBranch : ""}
                                onChange={(e) => setBankBranch(e.target.value)}
                              ></input>
                            </div>
                            {assetType === "Safe Deposit Locker" ||
                            assetType ===
                              "Public Provident Fund (PPF)/ Gratuity" ? (
                              <div
                                className="form-item"
                                style={{ width: "45%" }}
                              >
                                <label>
                                  {assetType ===
                                  "Public Provident Fund (PPF)/ Gratuity"
                                    ? "PPF Number"
                                    : "Locker Number"}
                                </label>
                                <input
                                  type="text"
                                  value={bankLocker ? bankLocker : ""}
                                  onChange={(e) =>
                                    setBankLocker(e.target.value)
                                  }
                                ></input>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {assetType === "Postal Recurring" ||
                      assetType === "National Savings Certificate(NSC)" ? (
                        <div>
                          <div className="form-row">
                            <div className="form-item">
                              <label>
                                {assetType ===
                                "National Savings Certificate(NSC)"
                                  ? "NSC "
                                  : "Account "}
                                Number
                              </label>
                              <input
                                type="number"
                                value={bankNumber ? bankNumber : ""}
                                onChange={(e) => setBankNumber(e.target.value)}
                              ></input>
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-item">
                              <label>
                                Name of the Bank/Post Office/Company
                              </label>
                              <input
                                type="text"
                                value={bankName ? bankName : ""}
                                onChange={(e) => setBankName(e.target.value)}
                              ></input>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {assetType === "Insurance Policies" ||
                      assetType === "Bond Debentures" ? (
                        <div>
                          <div className="form-row">
                            <div className="form-item">
                              <label>
                                Name of{" "}
                                {assetType === "Insurance Policies"
                                  ? "Insurance"
                                  : "the Bond"}
                              </label>
                              <input
                                type="text"
                                value={assetName ? assetName : ""}
                                onChange={(e) => setAssetName(e.target.value)}
                              ></input>
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-item" style={{ width: "45%" }}>
                              <label>
                                {assetType === "Insurance Policies"
                                  ? "Policy "
                                  : "Bond "}
                                Number
                              </label>
                              <input
                                type="text"
                                value={policyNumber ? policyNumber : ""}
                                onChange={(e) =>
                                  setPolicyNumber(e.target.value)
                                }
                              ></input>
                            </div>
                            {assetType === "Insurance Policies" ? (
                              <div
                                className="form-item"
                                style={{ width: "35%" }}
                              >
                                <label>Policy Name</label>
                                <input
                                  type="text"
                                  value={policyName ? policyName : ""}
                                  onChange={(e) =>
                                    setPolicyName(e.target.value)
                                  }
                                ></input>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {assetType === "Vehicles" ? (
                        <div>
                          <div className="form-row">
                            <div className="form-item" style={{ width: "25%" }}>
                              <label>Vehicle Brand</label>
                              <input
                                type="text"
                                value={brand ? brand : ""}
                                onChange={(e) => setBrand(e.target.value)}
                              ></input>
                            </div>

                            <div className="form-item" style={{ width: "45%" }}>
                              <label>Model</label>
                              <input
                                type="text"
                                value={model ? model : ""}
                                onChange={(e) => setModel(e.target.value)}
                              ></input>
                            </div>
                          </div>
                          <div className="form-row">
                            <div
                              className="form-item"
                              style={{ width: "100%" }}
                            >
                              <label>Registration Number</label>
                              <input
                                type="text"
                                value={vehicleNumber ? vehicleNumber : ""}
                                onChange={(e) =>
                                  setVehicleNumber(e.target.value)
                                }
                              ></input>
                            </div>
                          </div>{" "}
                        </div>
                      ) : (
                        ""
                      )}
                      <h3>Allocate to: </h3>
                      {beneficiaries.length !== 0 ? (
						<div style={{ padding: "0 20px" }} >
                        <table className="styled-table">
                          <thead>
                            <tr>
                              <th>No.</th>
                              <th>Name</th>
                              <th>% Share</th>
                            </tr>
                          </thead>
                          <tbody>
                            {beneficiaries.map((ben, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{ben[1]}</td>
                                <td>
                                  <input
                                    value={
                                      share[index] ? share[index]["value"] : 0
                                    }
                                    onChange={(e) =>
                                      handleShareChange(
                                        e,
                                        ben[1],
                                        ben[2],
                                        index
                                      )
                                    }
                                    type="number"
                                    min="0"
                                    max="100"
                                  ></input>
                                  %
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>) : (
                        ""
                      )}
                      <div
                        style={{margin: "20px" }}
                        className="form-row"
                      >
                        <button
                          type="submit"
                          onClick={(e) => addAsset(e)}
                          className="secondary-button"
                        >
                          <AddIcon /> ADD ASSET
                        </button>
                      </div>
                      {movableAssets.length !== 0 ? (
                        <h3>Movable Assets Allocation</h3>
                      ) : (
                        ""
                      )}
                      {movableAssets.length !== 0 ? (
                         <div style={{ padding: "0 20px" }} >
                        <table className="styled-table">
                          <thead>
                            <tr>
                              <th>No.</th>
                              <th>Type</th>
                              <th>Details</th>
                              <th>Successors</th>
                              <th>Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {movableAssets.map((iA, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{iA["assetType"]}</td>
                                <td>{iA["description"]}</td>
                                <td>
                                  <ul>
                                    {iA["share"].map((share, sindex) => (
                                      <li key={sindex}>
                                        {" "}
                                        {share["value"] !== "0" ? (
                                          <span>
                                            {share["name"]} {share["value"]}%{" "}
                                          </span>
                                        ) : (
                                          ""
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                </td>
                                <td className="remove-btn">
                                  <CancelIcon
                                    onClick={() => removeMovable(index)}
                                  ></CancelIcon>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        </div>
                      ) : (
                        ""
                      )}
                    </form>
                  </div>
                </div>

                <div
                  style={{
                    justifyContent: "space-between",
                    marginTop: "20px",
                  }}
                  className="form-row"
                >
                  <button onClick={(e) => setTabIndex(1)} id="next-btn">
                    Previous
                  </button>

                  <button onClick={(e) => initializeAlternate()} id="next-btn">
                    Next
                  </button>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="full-alt">
                  <h2>Details of Alternate Beneficiary</h2>
                  <p className="note-para">
                    (Note- If any of the previously-stated Beneficiary
                    predecease the author of the Will by any reason, in such
                    case who shall receive the assets or benefits under Will.)
                  </p>

                  {alternate ? (
                    <div style={{ padding: "0 20px" }}>
                    <table className="styled-table">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Asset Type</th>
                          <th>Details</th>
                          <th>Alternate Beneficiaries</th>
                        </tr>
                      </thead>
                      <tbody>
                        {alternate?.map((asset, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{asset["assesType"]}</td>
                            <td>{asset["details"]}</td>
                            <td>
                              <textarea
                                style={{ width: "250px", height: "100px" }}
                                width="300px"
                                height="100px"
                                placeholder="eg: Sunny Varma  Friend  100% or  Ashish Sachdeva Cousin 50% and Nikita Sachdeva Cousin 50%"
                                value={asset["altDetails"]}
                                onChange={(e) => {
                                  setAltBen(e, index);
                                }}
                              ></textarea>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                  ) : (
                    ""
                  )}

                  <div
                    style={{ justifyContent: "right", marginTop: "20px" }}
                    className="form-row"
                  >
                    <button onClick={(e) => setTabIndex1(0)} id="next-btn">
                      Previous
                    </button>

                    <button onClick={(e) => storeAlternate()} id="next-btn">
                      Next: Residuary Clause
                    </button>
                  </div>
                </div>
                <div className="alt-mob">
                  <h2>Details of Alternate Beneficiary</h2>
                  <p className="note-para">
                    (Note- If any of the previously-stated Beneficiary
                    predecease the author of the Will by any reason, in such
                    case who shall receive the assets or benefits under Will.)
                  </p>

                  {alternate ? (
                    <div style={{ padding: "0 20px" }}>
                    <table className="styled-table">
                      <thead>
                        <tr>
                          <th>No.</th>

                          <th>Asset Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {alternate?.map((asset, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <tr>
                                <td>
                                  {asset["assesType"]}
                                  {asset["details"]}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <textarea
                                    style={{ width: "250px", height: "100px" }}
                                    width="300px"
                                    height="100px"
                                    placeholder=" Add alternate beneficiary here eg: Sunny Varma  Friend  100% or  Ashish Sachdeva Cousin 50% and Nikita Sachdeva Cousin 50%"
                                    value={asset["altDetails"]}
                                    onChange={(e) => {
                                      setAltBen(e, index);
                                    }}
                                  ></textarea>
                                </td>
                              </tr>{" "}
                            </td>{" "}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                  ) : (
                    ""
                  )}

                  <div
                    style={{ justifyContent: "right", marginTop: "20px" }}
                    className="form-row"
                  >
                    <button onClick={(e) => setTabIndex1(0)} id="next-btn">
                      Previous
                    </button>

                    <button onClick={(e) => storeAlternate()} id="next-btn">
                      Next
                    </button>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <h2>Residuary Clause</h2>
                <h3>
                  Whom would you like to bequeth your residual properties?
                </h3>
                <p className="note-para">
                  (The properties which you have not included in the Will or
                  which you might acquire in future)
                </p>

                {beneficiaries.length !== 0 ? (
                  <div style={{ padding: "0 20px" }}>
                  <table className="styled-table">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>% Share</th>
                      </tr>
                    </thead>
                    <tbody>
                      {beneficiaries.map((ben, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{ben[1]}</td>
                          <td>
                            <input
                              value={share[index] ? share[index]["value"] : 0}
                              onChange={(e) =>
                                handleShareChange(e, ben[1], ben[2], index)
                              }
                              type="number"
                              min="0"
                              max="100"
                            ></input>
                            %
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                ) : (
                  ""
                )}
                <div
                  style={{ justifyContent: "right", marginTop: "20px" }}
                  className="form-row"
                >
                  <button onClick={(e) => setTabIndex1(1)} id="next-btn">
                    Previous
                  </button>

                  <button onClick={setResiduary1} id="next-btn">
                    Next: Will
                  </button>
                </div>
              </TabPanel>
            </Tabs>
          </TabPanel>
          <TabPanel>
          <FadeIn delay="100">
              <div
                className="content-last"
                style={{ backgroundColor: "#ffffff", overflow: "hidden", display:'flex', flexDirection:'column' }}
              >
                <img
                  src={Logo}
                  alt=""
                  width="auto"
                  style={{
                    alignSelf: "center",
                    maxWidth: "50%",
                    height: "auto",
                   
                    transform: "scale(0.5)",
                  }}
                />
                <p
                  style={{
                    color: "#f27317",
                    marginTop: "-30px",
                    textAlign: "center",
                    fontSize: "20px",
                    transitionDelay: "2s",
                  }}
                >
                  Email has been sent to the User!
                </p>
              </div>{" "}
            </FadeIn>{" "}
            <div
              style={{ marginTop: "20px" }}
              className="form-row"
            >
              <button onClick={() => setTabIndex(2)} id="next-btn">
                Previous
              </button>
            </div>
          </TabPanel>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}

export default Content;
