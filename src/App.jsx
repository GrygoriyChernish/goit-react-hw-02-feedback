import React, { Component } from 'react';

import './App.css';
import Container from './UI/Container/Container';
import Section from './UI/Section/Section';
import FeedbackOptions from './components/FeedbackOptions/FeedbackOptions';
import Statistics from './components/Statistics/Statistics';
import Notification from './components/Notification/Notification';

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleLeaveFeedback = option => {
    this.setState(prevState => ({
      [option]: prevState[option] + 1,
    }));
  };
  countTotalFeedback = () => {
    return Object.values(this.state).reduce((acc, number) => acc + number, 0);
  };
  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;
    return Math.round((good / this.countTotalFeedback()) * 100) || 0;
  };

  render() {
    const { good, neutral, bad } = this.state;

    return (
      <Container>
        <Section title="Please Leave feedback">
          <FeedbackOptions
            options={Object.keys(this.state)}
            onLeaveFeedback={this.handleLeaveFeedback}
          />
        </Section>
        {this.countTotalFeedback() === 0 ? (
          <Notification message="No feedback given"></Notification>
        ) : (
          <Section title="Statistics">
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          </Section>
        )}
      </Container>
    );
  }
}

export default App;
