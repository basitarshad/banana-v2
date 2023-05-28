import PropTypes from "prop-types";
import React from "react";
import {
  FlatList,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "../../assets/search-icon.png";
import { setErrorMessage, setUserName, setUsers } from "../../store/actions";
import data from "../dataDump/leaderboard.json";

const BananaScreen = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.userName);
  const users = useSelector((state) => state.users);
  const errorMessage = useSelector((state) => state.errorMessage);

  const indexUsersByName = () => {
    const indexedUsers = {};

    Object.values(data).forEach((user) => {
      indexedUsers[user.name.toLowerCase()] = user;
    });

    return indexedUsers;
  };

  const indexedUsers = indexUsersByName();

  // In this searchUser() function, we check whether the searched user is within
  // the top 10 by finding its index in the sorted user array.
  // If the index is less than 10, we follow Case 1 and display the top 10 list.
  // If the index is 10 or greater, we follow Case 2 and replace the
  // searched user with the last rank of the top 10 list.

  // The code handles both scenarios as per your requirement, ensuring that
  // the searched user is either included in the top 10
  // or given the appropriate rank in the overall list.

  const searchUser = () => {
    Keyboard.dismiss();
    const searchedUser = indexedUsers[userName.toLowerCase()];

    if (!searchedUser) {
      dispatch(
        setErrorMessage(
          "This user name does not exist! Please specify an existing user name!"
        )
      );
      dispatch(setUsers([]));
      return;
    }

    const sortedUsers = Object.values(indexedUsers).sort(
      (a, b) => b.bananas - a.bananas
    );

    if (
      sortedUsers.findIndex(
        (user) => user.name.toLowerCase() == searchedUser.name.toLowerCase()
      ) < 10
    ) {
      // Case 1: Searched user is within the top 10
      const topUsers = sortedUsers.slice(0, 10).map((user, index) => ({
        name: user.name,
        rank: index + 1,
        bananas: user.bananas,
        isSearchedUser: user.uid == searchedUser.uid,
      }));

      dispatch(setErrorMessage(""));
      dispatch(setUsers(topUsers));
    } else {
      // Case 2: Searched user is not within the top 10
      const lastUser = sortedUsers[9];
      searchedUser.rank = lastUser.rank;
      const allUsers = sortedUsers.map((user, index) => ({
        name: user.name,
        rank: index + 1,
        bananas: user.bananas,
        isSearchedUser: user.uid == searchedUser.uid,
      }));

      dispatch(setErrorMessage(""));
      dispatch(setUsers(allUsers));
    }
  };

  renderComponent = ({ item, index }) => {
    const isSearchedUser = item.name.toLowerCase() == userName.toLowerCase();
    return (
      <View>
        {index === 0 && (
          <View style={styles.headingsComponent}>
            <Text style={[styles.title, { flex: 0.35 }]}>Name</Text>
            <Text style={[styles.title, { flex: 0.15 }]}>Rank</Text>
            <Text style={[styles.title, { flex: 0.2 }]}>Bananas</Text>
            <Text style={[styles.title, { flex: 0.3 }]}>isSearchedUser</Text>
          </View>
        )}
        <View style={styles.dataContainer}>
          <Text
            style={[
              styles.data,
              {
                flex: 0.35,
                color: isSearchedUser ? "red" : "#151515",
              },
            ]}
          >
            {item.name}
          </Text>
          <Text
            style={[
              styles.data,
              {
                flex: 0.15,
              },
            ]}
          >
            {item.rank}
          </Text>
          <Text
            style={[
              styles.data,
              {
                flex: 0.2,
              },
            ]}
          >
            {item.bananas}
          </Text>
          <Text style={[styles.data, { flex: 0.2 }]}>
            {isSearchedUser ? "yes" : "no"}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.searchBar}>
        <Image source={SearchIcon} style={{ width: 20, height: 20 }} />
        <TextInput
          style={{ flex: 1 }}
          placeholder="Enter user name"
          value={userName}
          onChangeText={(text) => dispatch(setUserName(text))}
        />
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: userName?.length ? "lightblue" : "#ccc",
            },
          ]}
          onPress={searchUser}
          disabled={userName?.length ? false : true}
        >
          <Text style={styles.searchText}>Search</Text>
        </TouchableOpacity>
      </View>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : (
        <FlatList
          style={{ marginBottom: 80 }}
          data={users}
          keyExtractor={(item) => item.name}
          renderItem={renderComponent}
        />
      )}
    </View>
  );
};

// PropTypes is used for type checking the props in the BananaScreen component.
BananaScreen.propTypes = {
  userName: PropTypes.string,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      rank: PropTypes.number,
      bananas: PropTypes.number,
      isSearchedUser: PropTypes.bool,
    })
  ),
  errorMessage: PropTypes.string,
};

const styles = {
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
  },
  button: {
    marginLeft: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  errorMessage: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
  },
  headingsComponent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  title: { fontWeight: "bold", color: "#151515" },
  dataContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  data: {
    color: "#151515",
    paddingRight: 5,
  },
  searchText: { color: "#fff" },
};

export default BananaScreen;
