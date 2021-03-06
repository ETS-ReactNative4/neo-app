import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import constants from "../../constants/constants";
import TitleInput from "./Components/TitleInput";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { inject, observer } from "mobx-react";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import BackHandlerHoc from "../../CommonComponents/BackHandlerHoc/BackHandlerHoc";
import PrimaryHeader from "../../NavigatorsV2/Components/PrimaryHeader";

let _backHandler = () => null;

@ErrorBoundary()
@BackHandlerHoc(() => _backHandler())
@inject("journalStore")
@observer
class JournalStart extends Component {
  _titleRef = React.createRef();
  _descRef = React.createRef();

  state = {
    title: "",
    description: ""
  };

  constructor(props) {
    super(props);

    _backHandler = this.backHandler;

    const isEditing = props.route.params?.isEditing ?? false;
    props.navigation.setOptions({
      header: () =>
        PrimaryHeader({
          leftAction: () => _backHandler(),
          headerText: isEditing ? "Journal Setup" : "Journal Start"
        })
    });
  }

  editTitle = title => this.setState({ title });

  editDescription = description => this.setState({ description });

  submitJournalInfo = () => {
    const { updateJournalTitle } = this.props.journalStore;
    updateJournalTitle({
      title: this.state.title,
      desc: this.state.description
    })
      .then(() => {
        const isEditing = this.props.route.params?.isEditing ?? false;
        if (isEditing) {
          this.props.navigation.goBack();
        } else {
          this.props.navigation.replace("JournalSetup");
        }
      })
      .catch(() => {
        DebouncedAlert(
          constants.journalFailureMessages.title,
          constants.journalFailureMessages.failedToSubmitJournalTitle
        );
      });
  };

  componentDidMount() {
    setTimeout(() => {
      this._titleRef.current && this._titleRef.current.focus();
    }, 300);
    const { journalTitle, journalDesc } = this.props.journalStore;
    this.setState({
      title: journalTitle,
      description: journalDesc
    });
  }

  submitTitle = () => this._descRef.current && this._descRef.current.focus();

  backHandler = () => {
    const isEditing = this.props.route.params?.isEditing ?? false;
    const { journalTitle, journalDesc } = this.props.journalStore;
    /**
     * Editing mode, user made some changes
     */
    if (
      isEditing &&
      (this.state.title !== journalTitle ||
        this.state.description !== journalDesc)
    ) {
      DebouncedAlert(
        constants.journalBackConfirmation.journalEditingTitle.title,
        constants.journalBackConfirmation.journalEditingTitle.message,
        [
          {
            text:
              constants.journalBackConfirmation.journalEditingTitle.negative,
            onPress: () => {
              this.props.navigation.goBack();
            },
            style: "destructive"
          },
          {
            text:
              constants.journalBackConfirmation.journalEditingTitle.positive,
            onPress: () => null
          }
        ],
        { cancelable: false }
      );
    } else if (!isEditing && (this.state.title || this.state.description)) {
      /**
       * Fresh creation mode, user made some changes
       */
      DebouncedAlert(
        constants.journalBackConfirmation.journalTitleCreation.title,
        constants.journalBackConfirmation.journalTitleCreation.message,
        [
          {
            text:
              constants.journalBackConfirmation.journalTitleCreation.negative,
            onPress: () => {
              this.props.navigation.goBack();
            },
            style: "destructive"
          },
          {
            text:
              constants.journalBackConfirmation.journalTitleCreation.positive,
            onPress: () => null
          }
        ],
        { cancelable: false }
      );
    } else {
      this.props.navigation.goBack();
    }
    return true;
  };

  render() {
    const { journalStartData } = this.props.journalStore;
    const isEditing = this.props.route.params?.isEditing ?? false;

    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.journalStartContainer}
      >
        <Text
          style={styles.startTitle}
        >{`Greet your readers with a captivating title.`}</Text>

        <View style={styles.inputFieldCard}>
          <TitleInput
            inputRef={this._titleRef}
            titleLabel={"Title"}
            onEdit={this.editTitle}
            text={this.state.title}
            onInputSubmit={this.submitTitle}
            placeholder={journalStartData.title}
            containerStyle={styles.titleInputContainer}
            inputStyle={styles.titleInput}
            maxCharacters={journalStartData.titleLength}
          />
          <TitleInput
            inputRef={this._descRef}
            titleLabel={"Description"}
            onEdit={this.editDescription}
            text={this.state.description}
            onInputSubmit={() => null}
            maxCharacters={journalStartData.descLength}
            placeholder={journalStartData.desc}
            inputStyle={styles.descriptionInput}
          />
        </View>

        {this.state.title && this.state.description ? (
          <SimpleButton
            containerStyle={{
              borderRadius: 2,
              height: 45,
              width: 170,
              marginTop: 26,
              alignSelf: "center"
            }}
            textStyle={{ marginRight: 8 }}
            underlayColor={constants.firstColorAlpha(0.8)}
            action={() => this.submitJournalInfo()}
            text={isEditing ? "Update" : "Continue"}
            icon={constants.arrowRight}
            iconSize={isEditing ? 0 : 12}
            rightIcon={true}
            textColor={"white"}
          />
        ) : null}
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  journalStartContainer: {
    flex: 1,
    backgroundColor: constants.white1
  },
  startTitle: {
    ...constants.font24(constants.primarySemiBold),
    color: constants.black1,
    marginHorizontal: 32,
    textAlign: "center",
    marginVertical: 32
  },
  inputFieldCard: {
    marginHorizontal: 24,
    backgroundColor: "white",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "transparent",
    ...constants.elevationFive,
    marginBottom: 8
  },
  titleInputContainer: {
    borderBottomColor: constants.shade5,
    borderBottomWidth: 1
  },
  titleInput: {
    minHeight: 48,
    ...constants.fontCustom(constants.primarySemiBold, 18, 24),
    color: constants.black1
  },
  descriptionInput: {
    minHeight: 104,
    ...constants.fontCustom(constants.primaryRegular, 15, 24),
    color: constants.black1
  }
});

export default JournalStart;
