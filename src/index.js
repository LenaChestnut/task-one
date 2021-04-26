import 'normalize.css';
import './styles.scss';

function importAll(requireContext) {
    requireContext.keys().forEach(requireContext);
}

importAll(require.context('.', true, /\.js$/));
