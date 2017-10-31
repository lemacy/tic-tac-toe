import { connect } from 'react-redux';

import Config from './Config';
import * as gameActions from '../../models/game/actions';

const mapStateToProps = state => ({
  gridWidth: state.game.gridWidth,
  gridHeight: state.game.gridHeight,
  victoryNumber: state.game.victoryNumber,
});

const mapDispatchToProps = dispatch => ({
  gridWidthChange: value => dispatch(gameActions.gridWidthChange(value)),
  gridHeightChange: value => dispatch(gameActions.gridHeightChange(value)),
  victoryNumberChange: value => dispatch(gameActions.victoryNumberChange(value)),
  gameReset: () => dispatch(gameActions.gameReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Config);
