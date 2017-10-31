import { connect } from 'react-redux';
import Game from './Game';
import * as gameActions from '../../models/game/actions';

const mapStateToProps = state => ({
  currentPlayer: state.game.currentPlayer,
  gridState: state.game.gridState,
  gridWidth: state.game.gridWidth,
});

const mapDispatchToProps = dispatch => ({
  playerMove: player => position => dispatch(gameActions.playerMove(player)(position)),
  gameReset: () => dispatch(gameActions.gameReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
