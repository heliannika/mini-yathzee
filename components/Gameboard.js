import { useEffect, useState } from "react";
import { Pressable, Text, View, Alert } from "react-native";
import Header from './Header';
import Footer from './Footer';
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS } from "../constants/Game";
import styles from '../style/style';
import { Container, Row, Col } from 'react-native-flex-grid';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Scoreboard from '../components/Scoreboard';

let board = [];

export default Gameboard = ({navigation, route}) => {

    const [playerName, setPlayerName] = useState('');
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('Throw dices');
    const [gameEndStatus, setGameEndStatus] = useState(false);
    // Ovatko nopat ovat kiinnitetty
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
    // Noppien silmäluvut
    const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
    // Onko silmäluvulle valittu pisteet
    const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));
    // Kerätyt pisteet
    const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));
    //const [isDisabled, setIsDisabled] = useState(false);
    let dices = [...selectedDices];

    // setSelectedDices(!selectedDices);
    // setNbrOfThrowsLeft(NBR_OF_THROWS);

    const dicesRow = [];
    for (let dice = 0; dice < NBR_OF_DICES; dice++) {
        dicesRow.push(
            <Col key={"dice" + dice}>
                <Pressable
                    key={"dice" + dice}
                    onPress={() => selectDice(dice)}>
                    <MaterialCommunityIcons
                        name={board[dice]}
                        key={"dice" + dice}
                        size={50}
                        color={getDiceColor(dice)}>
                    </MaterialCommunityIcons>
                </Pressable>
            </Col>
        )
    }

    const pointsRow = [];
    for (let spot = 0; spot < MAX_SPOT; spot++) {
        pointsRow.push(
            <Col key={"pointsRow" + spot}>
                    <Text key={"pointsRow" + spot}>
                        {getSpotTotal(spot)}
                    </Text>
            </Col>
        )
    }

    const pointsToSelectRow = [];
    for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
        pointsToSelectRow.push(
            <Col key={"buttonsRow" + diceButton}>
                <Pressable
                    key={"buttonsRow" + diceButton}
                    onPress={() => selectDicePoints(diceButton)}
                    >

                    <MaterialCommunityIcons
                        name={"numeric-" + (diceButton + 1) + "-circle"}
                        key={"buttonsRow" + diceButton}
                        size={35}
                        color={getDicePointsColor(diceButton)}
                        >
                    </MaterialCommunityIcons>
                </Pressable>
            </Col>
        )
    }

    const selectDice = (i) => {
        if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus) {
            dices[i] = selectedDices[i] ? false : true;
            setSelectedDices(dices);
        }
        else {
            setStatus('You have to throw dices first.')
        }
    }


    const selectDicePoints = (i) => {
        if (nbrOfThrowsLeft === 0) {
            let selectedPoints = [...selectedDicePoints];
            let points = [...dicePointsTotal];
            if (!selectedPoints[i]) {
                selectedPoints[i] = true;
                let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
                points[i] = nbrOfDices * (i + 1);
            }
            else {
                setStatus('You already selected points for ' +  (i + 1));
                return points[i];
            }
            setDicePointsTotal(points);
            setSelectedDicePoints(selectedPoints);
            setNbrOfThrowsLeft(NBR_OF_THROWS);
            undoDiceSelection();
            return points[i];
        }
        else {
            setStatus('Throw ' + NBR_OF_THROWS + ' times before setting points');
        }
    }

    // Unselecting the dices during the game.

    const undoDiceSelection = () => {
        dices.fill(false);
        setSelectedDices(dices);
    }

    const throwDices = () => {
        if (nbrOfThrowsLeft === 0 && !gameEndStatus) {
            setStatus('Select your points before the next throw');
            return 1;
        }
        else if (nbrOfThrowsLeft === 0 && gameEndStatus) {
            setGameEndStatus(false);
            diceSpots.fill(0);
            dicePointsTotal.fill(0);
        }

        /* Starting the game again after points are selected for every number. */

        else if (selectedDicePoints.every((val) => val === true)) {
            newGame();
        }

        let spots = [...diceSpots];
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                board[i] = 'dice-' + randomNumber;
                spots[i] = randomNumber;
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
        setDiceSpots(spots);
        setStatus('Select and throw dices again');
    }

    const gameOverAlert = () =>
    Alert.alert('Game over!', 'The game came to the end. Start a new game by throwing dices.', [
      {
        text: 'Go to scoreboard',
        onPress: () => navigation.navigate('Scoreboard'),
      },
      {text: 'Start a new game'},
    ]);

    // Function for the new game.

    const newGame = () => {
        board = [];
        gameOverAlert();
        setDicePointsTotal(new Array(MAX_SPOT).fill(0));
        setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
        setNbrOfThrowsLeft(NBR_OF_THROWS);
        diceSpots.fill(0);
    }

    function getSpotTotal(i) {
        return dicePointsTotal[i];
    }

    function getDiceColor(i) {
        return selectedDices[i] ? "deeppink" : "lightpink";
    }

    function getDicePointsColor(i) {
        return selectedDicePoints[i] ? "deeppink" : "lightpink";
    }

    useEffect(() => {
        if (playerName === '' && route.params?.player) {
            setPlayerName(route.params.player);
        }
    }, []);

    return (
        <>
            <Header />
            <View>
                <Text>Gameboard here...</Text>
                <Container fluid>
                    <Row>{dicesRow}</Row>
                </Container>
                <Text>Throws left: {nbrOfThrowsLeft}</Text>
                <Text>{status}</Text>
                <Pressable
                    onPress={() => throwDices()}
                    >
                        <Text>THROW DICES</Text>
                </Pressable>
                <Container fluid>
                    <Row>{pointsRow}</Row>
                </Container>
                <Container fluid>
                    <Row>{pointsToSelectRow}</Row>
                </Container>
                <Text>TOTAL POINTS: {dicePointsTotal}</Text>
                <Text>Player: {playerName}</Text>
            </View>
            <Footer />
        </>
    )
}