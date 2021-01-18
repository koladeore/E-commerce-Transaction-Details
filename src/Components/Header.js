import React, { useState, useEffect } from "react";
import axios from "axios";
import Posts from "./Posts/Posts";
import Pagination from "./Pagination/Paginate";
import SearchIcon from "@material-ui/icons/Search";
import CheckBox from "./CheckBox/CheckBox";
import "./Header.css";

const Header = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  // filterGenderState
  const [postsMale, setPostsMale] = useState([]);
  const [postsFemale, setPostsFemale] = useState([]);
  const [postsGenderOthers, setPostsGenderOthers] = useState([]);
  const [checkedMale, setCheckedMale] = useState(false);
  const [checkedFemale, setCheckedFemale] = useState(false);
  const [checkedOthers, setCheckedOthers] = useState(false);
  // filterPaymentMethods
  const [postsMoneyOrder, setPostsMoneyOrder] = useState([]);
  const [postsPaypal, setPostsPaypal] = useState([]);
  const [postsCheck, setPostsCheck] = useState([]);
  const [postsCC, setPostsCC] = useState([]);
  const [checkedMoneyOrder, setCheckedMoneyOrder] = useState(false);
  const [checkedPaypal, setCheckedPaypal] = useState(false);
  const [checkedCheck, setCheckedCheck] = useState(false);
  const [checkedCC, setCheckedCC] = useState(false);
  // {fetchData}
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("https://api.enye.tech/v1/challenge/records");
      const {
        data: {
          records: { profiles },
        },
      } = res;
      setPosts(profiles);
      setAllPosts(profiles);
      setLoading(false);
    };
    fetchPosts();
  }, []);
  // searchResult
  useEffect(() => {
    const filterResults = (searchTerm) => {
      if (posts.length) {
        setLoading(true);
        const resultData = posts?.filter(
          (postSearch) =>
            postSearch.FirstName.includes(searchTerm) ||
            postSearch.LastName.includes(searchTerm)
        );
        setPosts(resultData);
        setLoading(false);
      }
      if (searchTerm.length === 0) {
        setPosts(allPosts);
      }
    };
    filterResults(searchTerm);
  }, [searchTerm, allPosts]);

  // filterGender
  useEffect(() => {
    setPosts(allPosts);
    setPostsMale([]);
    setPostsFemale([]);
    setPostsGenderOthers([]);
    const filterGender = (userGender) => {
      setLoading(true);
      const filterGenderData = allPosts?.filter(
        (postGender) => postGender.Gender === userGender
      );
      setLoading(false);
      return filterGenderData;
    };
    if (checkedMale) {
      const maleFilter = filterGender("Male");
      setPostsMale(maleFilter);
    }
    if (checkedFemale) {
      const femaleFilter = filterGender("Female");
      setPostsFemale(femaleFilter);
    }
    if (checkedOthers) {
      const othersFilter = filterGender("Prefer to skip");
      setPostsGenderOthers(othersFilter);
    }
  }, [checkedMale, checkedFemale, checkedOthers]);
  // joinAllGenderFilter
  useEffect(() => {
    if (
      postsMale.length > 0 ||
      postsFemale.length > 0 ||
      postsGenderOthers.length > 0
    ) {
      const joinAllGender = postsMale.concat(postsFemale, postsGenderOthers);
      setPosts(joinAllGender);
    }
  }, [postsMale, postsFemale, postsGenderOthers]);
  // filter Payments Methods
  useEffect(() => {
    setPosts(allPosts);
    setPostsMoneyOrder([]);
    setPostsPaypal([]);
    setPostsCheck([]);
    setPostsCC([]);
    const filterPaymentMethods = (userPaymentMethod) => {
      setLoading(true);
      const filterPaymentData = allPosts?.filter(
        (postPaymentMethod) =>
          postPaymentMethod.PaymentMethod === userPaymentMethod
      );
      setLoading(false);
      return filterPaymentData;
    };
    if (checkedMoneyOrder) {
      const moneyOrderFilter = filterPaymentMethods("money order");
      setPostsMoneyOrder(moneyOrderFilter);
    }
    if (checkedPaypal) {
      const paypalFilter = filterPaymentMethods("paypal");
      setPostsPaypal(paypalFilter);
    }
    if (checkedCheck) {
      const checkFilter = filterPaymentMethods("check");
      setPostsCheck(checkFilter);
    }
    if (checkedCC) {
      const CCFilter = filterPaymentMethods("cc");
      setPostsCC(CCFilter);
    }
  }, [checkedMoneyOrder, checkedPaypal, checkedCheck, checkedCC]);
  // joinAllPaymentFilter
  useEffect(() => {
    if (
      postsMoneyOrder.length > 0 ||
      postsPaypal.length > 0 ||
      postsCheck.length > 0 ||
      postsCC.length > 0
    ) {
      const joinAllPaymentMethod = postsMoneyOrder.concat(
        postsPaypal,
        postsCheck,
        postsCC
      );
      setPosts(joinAllPaymentMethod);
    }
  }, [postsMoneyOrder, postsPaypal, postsCheck, postsCC]);
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleFilterMale = (e) => {
    setCheckedMale(e.target.checked);
  };
  const handleFilterFemale = (e) => {
    setCheckedFemale(e.target.checked);
  };
  const handleFilterOthers = (e) => {
    setCheckedOthers(e.target.checked);
  };
  const handleFilterMoneyOrder = (e) => {
    setCheckedMoneyOrder(e.target.checked);
  };
  const handleFilterPaypal = (e) => {
    setCheckedPaypal(e.target.checked);
  };
  const handleFilterCheck = (e) => {
    setCheckedCheck(e.target.checked);
  };
  const handleFilterCC = (e) => {
    setCheckedCC(e.target.checked);
  };
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  console.log("potsLength", posts.length);
  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
      <div className="header">
        <h1 className="header-text">E-commerce Transaction Details</h1>
        <div className="head__search">
          <div className="header__search">
            <SearchIcon />
            <input
              value={searchTerm}
              onChange={handleChange}
              placeholder="Search"
              type="text"
            />
          </div>
        </div>
        <div className="container__filter">
          <h3>Filter By</h3>
          <div className="filter__body">
            <h6>Gender:</h6>
            <CheckBox id="cb1" title="Male" onChange={handleFilterMale} />
            <CheckBox id="cb2" title="Female" onChange={handleFilterFemale} />
            <CheckBox
              id="cb3"
              title="Prefer to skip"
              onChange={handleFilterOthers}
            />
          </div>
          <div className="filter__body">
            <h6>Payment Method:</h6>
            <CheckBox
              id="cb4"
              title="MoneyOrder"
              onChange={handleFilterMoneyOrder}
            />
            <CheckBox id="cb5" title="Paypal" onChange={handleFilterPaypal} />
            <CheckBox id="cb6" title="check" onChange={handleFilterCheck} />
            <CheckBox id="cb7" title="cc" onChange={handleFilterCC} />
          </div>
        </div>
        <Posts posts={currentPosts} loading={loading} />
        <Pagination
          postPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default Header;
