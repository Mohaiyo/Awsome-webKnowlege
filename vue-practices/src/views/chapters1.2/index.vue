<template>
	<div>
		<PersonalInfo
			v-model="phoneInfo"
			:zip-code.sync="zipCode"
      :validate="validate"
			required
			message="手机号为空或者不合法"
		/>
		<PersonalInfo
			:phone-info="phoneInfo"
			:zip-code="zipCode"
      :validate="validate"
      required
			message="手机号为空或者不合法"
			@change="(val) => (phoneInfo = val)"
			@update:zipCode="(val) => (zipCode = val)"
		/>
		<br />
		phoneInfo: {{ phoneInfo }}
		<br />
		zipCode: {{ zipCode }}
	</div>
</template>

<script>
import PersonalInfo from './PersonalInfo'
export default {
	name: 'chapter2',
	components: {
		PersonalInfo
	},
	data() {
		return {
			phoneInfo: {
				areaCode: '+86',
				phone: ''
			},
			zipCode: ''
		}
	},
	methods: {
		validate(phone = '') {
			return phone && phone.match(/^1[0-9]{10}$/)
		}
	}
}
</script>
