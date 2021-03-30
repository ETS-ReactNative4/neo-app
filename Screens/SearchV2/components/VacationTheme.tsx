import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {SearchSection} from './Section';
import {ThemeCard} from './ThemeCard';
type VacationThemePropType = {
  title: string;
  list: {
    image: string;
    title: string;
    searchQuery: string;
  }[];
  onClick: ({searchQuery}: {searchQuery: string}) => unknown;
};

export const VacationTheme = ({
  list = [],
  title,
  onClick,
}: VacationThemePropType) => {
  return (
    <SearchSection title={title}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews
        horizontal
        style={styles.container}>
        {list.map(({image, title: text, searchQuery}, index) => (
          <ThemeCard
            title={text}
            image={image}
            containerStyle={
              index !== list.length - 1
                ? styles.themeCardContainer
                : styles.noMargin
            }
            action={() => onClick({searchQuery})}
          />
        ))}
      </ScrollView>
    </SearchSection>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginRight: -16,
    marginLeft: 16,
  },
  noMargin: {
    marginRight: 0,
  },
  themeCardContainer: {
    marginRight: 16,
  },
});
