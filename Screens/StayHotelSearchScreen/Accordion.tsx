import { ChevronRight, ChevronTop } from '@pyt/icons'
import { Box, Pressable, Text, TextProps } from '@pyt/micros'
import React, {
	FunctionComponent,
	ReactNode,
	useCallback,
	useRef,
	useState,
} from 'react'
import { StyleEngineProps } from '@pyt/core/native'
import { Animated, LayoutChangeEvent, ViewProps } from 'react-native'

export interface AccordionProps extends StyleEngineProps {
	title: string
	children: ReactNode
	titleElement: React.ReactElement
	icon?: React.ReactElement
	titleProps?: TextProps
	containerStyle?: ViewProps
	minHeight?: number
}

export const Accordion: FunctionComponent<AccordionProps> = ({
	title,
	titleElement,
	icon,
	children,
	fontFamily,
	titleProps = {},
	containerStyle = {},
	minHeight,
}) => {
	const [expand, setExpand] = useState(false)
	const [titleHeight, setTitleHeight] = useState(0)
	const [childrenHeight, setChildrenHeight] = useState(0)

	const animation = useRef(new Animated.Value(minHeight || 19)).current
	// const ArrowIcon = expand ? ChevronTop : ChevronRight

	const toggle = () => {
		const initialValue = expand ? childrenHeight + titleHeight : titleHeight
		const finalValue = expand ? titleHeight : childrenHeight + titleHeight

		setExpand(prevState => !prevState)

		animation.setValue(initialValue)

		Animated.timing(animation, {
			duration: 150,
			toValue: finalValue,
			useNativeDriver: false,
		}).start()
	}

	const setMaxHeight = useCallback((event: LayoutChangeEvent) => {
		setChildrenHeight(event.nativeEvent.layout.height)
	}, [])

	const setMinHeight = useCallback((event: LayoutChangeEvent) => {
		animation.setValue(event.nativeEvent.layout.height)
		setTitleHeight(event.nativeEvent.layout.height)
	}, [])

	return (
		<Animated.View
			style={[{ overflow: 'hidden' }, { height: animation }, containerStyle]}
		>
			<Pressable onPress={toggle}>
				<Box onLayout={setMinHeight}>
					{titleElement ? (
						titleElement
					) : (
						<Box flexDirection="row" alignItems="center">
							{icon}
							<Text
								fontSize={15}
								lineHeight={19}
								color="#000000"
								fontFamily={fontFamily}
								{...titleProps}
								marginStart={icon ? 4 : 0}
								marginEnd={6}
							>
								{title}
							</Text>
							{/* <ArrowIcon fill="#555555" width={12} height={12} /> */}
						</Box>
					)}
				</Box>
			</Pressable>
			<Box onLayout={setMaxHeight}>
				{titleHeight ? <Box>{children}</Box> : null}
			</Box>
		</Animated.View>
	)
}
