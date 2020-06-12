import './scss/index.scss';
import { Excel } from './components/excel/Excel';
import { Header } from '@/components/header/Header';
import { Toolbar } from '@/components/toolbar/Toolbar';
import { Formula } from '@/components/formula/Formula';
import { Table } from '@/components/table/Table';
import { createStore } from '@core/createStore';
import { rootReducer } from '@/store/rootReducer';
import { storage, debaunce } from '@core/utils';
import { initialState } from '@/store/initialState';

const store = createStore(rootReducer, initialState);

const stateListener = debaunce((state) => {
	console.log(state);
	storage('excel-state', state);
}, 500);

store.subscribe(stateListener);

const excel = new Excel('#app', {
	components: [Header, Toolbar, Formula, Table],
	store,
});

excel.render();
