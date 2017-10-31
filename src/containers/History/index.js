import { connect } from 'react-redux';
import History from './History';
import * as gameActions from '../../models/game/actions';

const mapStateToProps = state => ({
  history: state.game.history.map((item, key) => ({
    active: key + 1 < state.game.history.length,
    stepNumber: key + 1,
    label: key + 1 < state.game.history.length ? (`${key + 1}. step`) : (`Waiting for player [${state.game.currentPlayer}]`),
  })),
});

const mapDispatchToProps = dispatch => ({
  historyJump: step => dispatch(gameActions.historyJump(step)),
});

export default connect(mapStateToProps, mapDispatchToProps)(History);
