<template>
  <div>
    <a-tabs>
      <a-tab-pane key="props" tab="属性">
        <props-com title="props Demo" class="prop-wrap" name='wayne' :type="type" :list="[1,2,3,4]" is-visible :change-fn="changeHandle" />
      </a-tab-pane>
      <a-tab-pane key="Event" tab="事件">
        <event-com :name="name" @change="nameChangeHandle" />
      </a-tab-pane>
      <a-tab-pane key="slot" tab="插槽">
        <h2>2.6新语法</h2>
        <slot-com>
          <p>default slot</p>
          <template #title>
            <p>title slot1</p>
            <p>title slot2</p>
          </template>
          <template #title>
            <p>title slot3</p>
            <p>title slot4</p>
          </template>
          <template #item="props">
            <p>item slot {{ props }}</p>
          </template>
          <template v-slot:user="{firstName: person, lastName: test}">
            <p slot="user">{{ person + ' ' + test }}</p>
          </template>
        </slot-com>
        <br />
        <h2>2.5旧语法</h2>
        <slot-com url="/profile">
          <p>default slot</p>
          <p slot="title">title slot1</p>
          <p slot="title">title slot2</p>
          <p slot="title">title slot3</p>
          <p slot="title">title slot4</p>
          <p slot="item" slot-scope="props">item slot {{ props }}, Clicking here will send you to: /profile</p>
          <p slot="user" slot-scope="user">{{ user.firstName }}</p>
        </slot-com>
      </a-tab-pane>
      <a-tab-pane key="bigProps" tab="大属性">
        <big-props :name="bigPropsName" :on-change="handleBigPropsChange" :slot-default="getDefault()" :slot-title="getTitle()" :slot-scope-item="getItem" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import PropsCom from './Props'
import EventCom from './Events'
import SlotCom from './Slot'
import BigProps from './BigProps'
export default {
  name: "ChaptersOne",
  components: {
    PropsCom,
    EventCom,
    SlotCom,
    BigProps
  },
  data() {
    return {
      type: 'primary',
      name: 'Wayne',
      bigPropsName: 'bigPropsName',

    }
  },
  methods: {
    changeHandle(type) {
      this.type = type
    },
    nameChangeHandle(val) {
      this.name = val
    },
    handleBigPropsChange(val) {
      this.bigPropsName = val
    },
    getDefault() {
      return [this.$createElement("p", "default slot")]
    },
    getTitle() {
      return [
        this.$createElement("p", "title slot1"),
        this.$createElement("p", "title slot2")
      ]
    },
    getItem(props) {
      return [
        this.$createElement("p", `item slot-scope ${JSON.stringify(props)}`)
      ]
    }
  }
}
</script>

