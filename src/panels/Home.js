import React from 'react';
import PropTypes from 'prop-types';
import bridge from "@vkontakte/vk-bridge";
import "./Home.css"
import {Panel, PanelHeader, Group, Header, Link, Div, SimpleCell, Button, Text, Headline, List} from "@vkontakte/vkui";

const Home = ({ id }) => {
	/**
	 * задача или действие успешно выполнено, не выполнено или выдало предупреждение
	 * * @param {"error"|"success"|"warning"} type
	 */
	const tapticNotificationOccurred = type => {
		if (bridge.supports('VKWebAppTapticNotificationOccurred')) {
			bridge.send('VKWebAppTapticNotificationOccurred', {type})
				.then(() => {
				})
				.catch(() => {
				})
		}
	};

	/**
	 * пользователь делает или подтверждает выбор
	 * @param {"light"|"medium"|"heavy"} style
	 */
	const tapticImpactOccurred = style => {
		if (bridge.supports('VKWebAppTapticImpactOccurred')) {
			bridge.send('VKWebAppTapticImpactOccurred', {style})
				.then(() => {
				})
				.catch(() => {
				})
		}
	};

	/**
	 * пользователь изменил выбор
	 */
	const tapticSelectionChanged = () => {
		if (bridge.supports('VKWebAppTapticSelectionChanged')) {
			bridge.send('VKWebAppTapticSelectionChanged', {})
				.then(() => {
				})
				.catch(() => {
				})
		}
	};

	return (
		<Panel id={id}>
			<PanelHeader>Taptic Example</PanelHeader>
			<Group header={
				<Header aside={
					<Link
						href="https://developer.apple.com/documentation/uikit/uinotificationfeedbackgenerator/2369826-notificationoccurred"
						target="_blank" rel="noreferrer noopener">
						apple doc
					</Link>
				} subtitle="Отклик на успешность выполнения действия">
					notificationOccurred
				</Header>
			}>
				<Div>
					<Text weight="regular">
						Этот метод сообщает генератору, что задача или действие успешно выполнено, не выполнено или выдало
						предупреждение. В ответ генератор может воспроизводить соответствующие тактильные сигналы, основываясь на
						предоставленном значении type
					</Text>
				</Div>
				<Div>
					<Headline>Type</Headline>
				</Div>
				<List>
					<SimpleCell disabled={true} after={<Button onClick={() => tapticNotificationOccurred('success')}>Tap</Button>}>
						Success
					</SimpleCell>
					<SimpleCell disabled={true} after={<Button onClick={() => tapticNotificationOccurred('warning')}>Tap</Button>}>
						Warning
					</SimpleCell>
					<SimpleCell disabled={true} after={<Button onClick={() => tapticNotificationOccurred('error')}>Tap</Button>}>
						Error
					</SimpleCell>
				</List>
			</Group>

			<Group header={
				<Header aside={
					<Link
						href="https://developer.apple.com/documentation/uikit/uiselectionfeedbackgenerator/2374284-selectionchanged"
						target="_blank" rel="noreferrer noopener">
						apple doc
					</Link>
				} subtitle="Отклик на изменение выбора">
					selectionChanged
				</Header>
			}>
				<Div>
					<Text weight="regular">
						Этот метод сообщает генератору, что пользователь изменил выбор. В ответ генератор может воспроизвести
						соответствующие тактильные сигналы. Не используйте этот тип обратной связи в том случае, когда пользователь
						делает или подтверждает выбор; используйте его только при изменении выбора.
					</Text>
				</Div>
				<Div>
					<Button onClick={() => tapticSelectionChanged()}>Tap</Button>
				</Div>
			</Group>

			<Group header={
				<Header aside={
					<Link href="https://developer.apple.com/documentation/uikit/uiimpactfeedbackgenerator/2374287-impactoccurred"
								target="_blank" rel="noreferrer noopener">
						apple doc
					</Link>
				} subtitle="Отклик на столкновение">
					impactOccurred
				</Header>
			}>
				<Div>
					<Headline>Style</Headline>
				</Div>
				<List>
					<SimpleCell disabled={true} after={<Button onClick={() => tapticImpactOccurred('light')}>Tap</Button>}>
						Light
					</SimpleCell>
					<SimpleCell disabled={true} after={<Button onClick={() => tapticImpactOccurred('medium')}>Tap</Button>}>
						Medium
					</SimpleCell>
					<SimpleCell disabled={true} after={<Button onClick={() => tapticImpactOccurred('heavy')}>Tap</Button>}>
						Heavy
					</SimpleCell>
				</List>
			</Group>
		</Panel>
	)
};

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired
};

export default Home;
