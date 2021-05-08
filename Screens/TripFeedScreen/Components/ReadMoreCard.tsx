import React, { useState, ReactNode, useEffect } from 'react'
import { StyleEngineProps } from '@pyt/core'
import { FunctionComponent } from 'react'
import { Box, Text } from '@pyt/micros'
import { Pressable, TouchableOpacity, Text as NativeText } from 'react-native'
// import { ChevronDown, ChevronTop } from '@pyt/icons'

type DataType = {
	text: string
	icon: React.ReactElement | null
}
export interface ReadMoreCardProps extends StyleEngineProps {
	title?: string
	content?: string
	fontFamily: string
	data?: [] | DataType[] | string
	RenderItem?: React.ReactElement
	defaultVisibleItemCount: number
	showViewLess?: boolean
	viewLessElement?: ReactNode
	viewMoreElement?: ReactNode
}

export const TextComponent = ({ data, showViewMore, numOfLines }: { data: string; showViewMore: boolean; numOfLines: number }) => (
	<Box alignSelf="flex-start">
		<Text numberOfLines={showViewMore ? numOfLines: undefined }>{data}</Text>
	</Box>
)
export const ReadMoreCard: FunctionComponent<ReadMoreCardProps> = ({
	title = '',
	data = [],
	defaultVisibleItemCount = 4,
	showViewLess,
	RenderItem,
	fontFamily,
	viewMoreElement,
	viewLessElement,
}) => {
	const dataLength = data.length
	const [showViewMore, setViewMore] = useState(true)

	useEffect(()=>{
		setViewMore(dataLength > defaultVisibleItemCount)
	},[data])

	const toggle = () => {
		setViewMore(prevState => !prevState)
	}

	// const Icon = showViewMore ? ChevronDown : ChevronTop
	const showLink =
		dataLength &&
		dataLength !== defaultVisibleItemCount &&
		dataLength > defaultVisibleItemCount &&
		!!RenderItem

	return (
		<Box>
			{title ? (
				<Text
					color={'#333333'}
					fontSize={17}
					lineHeight={16}
					fontWeight={'600'}
					fontFamily={fontFamily}
				>
					{title}
				</Text>
			):null}
			{dataLength && RenderItem
				? React.cloneElement(RenderItem, {
						data: data.slice(
							0,
							showViewMore ? defaultVisibleItemCount :  dataLength 
						),
						showViewMore: showViewMore 
				  })
				: null}
			 {showLink ? (
				<Pressable onPress={toggle} style={{ alignSelf: 'flex-start' }}>
					{/* {showViewMore || showViewLess ? (
						viewMoreElement && viewLessElement ? (
							showViewMore ? (
								viewMoreElement
							) : (
								viewLessElement
							)
						) : ( */}
							<Box flexDirection="row" alignItems="center">
								<Text
									color="#333333"
									fontSize={14}
									lineHeight={18}
									fontWeight={"600"}
									fontFamily={fontFamily}
								>
									{showViewMore ? 'View all' : 'View less'}{' '}
								</Text>
								<Text>
								   {/* <Icon width={14} height={10} fill="#555555" /> */}
								</Text>
								
							</Box>
						{/* )
					) : null} */}
				</Pressable>
			) : null} 
		</Box>
	)
}
